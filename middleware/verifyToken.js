import jsonwebtoken from 'jsonwebtoken';

let verifiedToken = '';

const setVerifiedToken = (token) => {
  verifiedToken = token;
};

const getVerifiedToken = () => verifiedToken;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const token = authHeader.split(' ')[1];
    setVerifiedToken(jsonwebtoken.verify(token, process.env.JWT_SECRET));
    console.log(verifiedToken);
    return next();
  } catch (e) {
    return res.status(401).json({
      error:
        'Invalid authorization header. Expected format is "Bearer <token>".',
    });
  }
};

export { getVerifiedToken, verifyToken };
