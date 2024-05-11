const verifyIsAdmin = (req, res, next) => {
  if (req.user.role === 'Admin') {
    return next();
  }
  return res.status(403).json({ msg: 'You are unauthorized' });
};

export default verifyIsAdmin;
