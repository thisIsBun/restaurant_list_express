import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.js';

const usePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (user) {
            if (user.password !== password) {
              return done(null, false, { message: 'user password incorrect' });
            } else {
              return done(null, user);
            }
          }
          return done(null, false, { message: 'email no register' });
        })
        .catch((error) => {
          return done(error);
        });
    }),
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
