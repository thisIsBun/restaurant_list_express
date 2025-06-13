import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

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
