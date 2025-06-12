const authenticator = (req, res, next) => {
  // req.isAuthenticated is from passport
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
};

export default authenticator;
