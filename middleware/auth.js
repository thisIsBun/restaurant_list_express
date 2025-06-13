const authenticator = (req, res, next) => {
  // req.isAuthenticated is from passport
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('warning_msg', '需先登入才可以瀏覽網頁');
  res.redirect('/users/login');
};

export default authenticator;
