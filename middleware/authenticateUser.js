import jsonwebtoken from "jsonwebtoken";
import Users from "../models/users.model.js";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Access token missing" });
  }

  let verifiedToken = "";
  try {
    const token = authHeader.split(" ")[1];
    verifiedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({
      error:
        'Invalid authorization header. Expected format is "Bearer <token>".',
    });
  }

  try {
    const { username } = verifiedToken;
    const user = await Users.findOne({ where: { username: username } });
    if (!user) {
      return res.status(401).json({
        error: "This token is not authorized to access the given resource",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

export default authenticateUser;
