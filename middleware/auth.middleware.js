const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const accessToken = req.cookies.token;

  try {
    // const token = req.headers.authorization.split(' ')[1]; // Bearer Token
    // console.log(req.headers['cookie'], 'req.headers');

    if (!accessToken) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    console.log(decoded, 'decoded');
    // if (!decoded) {

    // }

    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
