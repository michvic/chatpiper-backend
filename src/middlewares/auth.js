
const jwt = require('jsonwebtoken');
const {jwtsecret} = require('../config')

const decode = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization;
  console.log(jwtsecret)
  try {
    const decoded = jwt.verify(accessToken, jwtsecret);
    req.userId = decoded.userId;
    req.profile = decoded.profile;
    return next();

  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
}

module.exports = {decode}

