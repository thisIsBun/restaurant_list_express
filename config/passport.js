import passport from 'passport';
import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const usePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (user) {
              if (bcrypt.compareSync(password, user.password)) {
                return done(null, user);
              } else {
                req.flash('warning_msg', '密碼錯誤。');
                return done(null, false);
              }
            }
            req.flash('warning_msg', '信箱尚未註冊。');
            return done(null, false);
          })
          .catch((error) => {
            return done(error);
          });
      },
    ),
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: process.env.FB_callbackURL,
        profileFields: ['displayName', 'email'],
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json;
        User.findOne({ email })
          .then((user) => {
            if (user) {
              console.log('have user');
              return done(null, user);
            }
            console.log('no have user');
            const randomPassword = Math.random().toString(36).slice(-8);
            return bcrypt
              .genSalt(10)
              .then((salt) => bcrypt.hashSync(randomPassword, salt))
              .then((hash) => User.create({ name, email, password: hash }))
              .then(() => {
                resizeBy.render('/');
              });
          })
          .catch((error) => {
            return done(error);
          });
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((error) => done(error, null));
  });
};

export default usePassport;
