
const verifyIsAdmin = (req, res, next) => {
  if (req.user.role != "Admin") {
    return res.status(403).json({ msg: "You are unauthorized" });
  }

  next();
};

export default verifyIsAdmin;
