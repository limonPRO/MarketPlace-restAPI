require('dotenv').config()
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = decodedToken;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }
  };

  module.exports = authenticateUser;