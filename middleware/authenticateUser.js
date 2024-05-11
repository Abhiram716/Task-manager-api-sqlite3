import Users from '../models/users.model.js';

import { getVerifiedToken } from './verifyToken.js';

const authenticateUser = async (req, res, next) => {
  try {
    const { username } = getVerifiedToken();
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'This token is not authorized to access the given resource' });
    }
    req.user = user;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
  return next();
};

export default authenticateUser;
