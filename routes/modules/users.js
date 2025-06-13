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
  const errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push('欄位皆為必填。');
  }

  if (password !== confirmPassword) {
    errors.push('密碼與確認密碼不一致。');
  }

  if (errors.length > 0) {
    return res.render('register', { errors, name, email, password, confirmPassword });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push('信箱已經註冊。');
      return res.render('register', { errors, name, email, password, confirmPassword });
    }
    return User.create({ name, email, password })
      .then(() => {
        res.render('login');
      })
      .catch((error) => console.log(error));
  });
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
  req.flash('success_msg', '登出成功。');
  res.redirect('/users/login');
});

export default router;
