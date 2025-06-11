import express from 'express';
import User from '../../models/user.js';
import passport from 'passport';
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log('user existed already');
        res.render('register', { name, email, password, confirmPassword });
      } else {
        return User.create({ name, email, password });
      }
    })
    .then(() => {
      res.render('login');
    })
    .catch((error) => console.log(error));
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  }),
);

router.get('/logout', (req, res) => {
  req.logout(); // Passport method
  res.redirect('/users/login');
});

export default router;
