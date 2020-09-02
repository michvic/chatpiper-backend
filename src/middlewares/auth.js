
const jwt = require('jsonwebtoken');


const decode = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    req.profile = decoded.profile;
    return next();

  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
}

module.exports = {decode}

