const jwt = require('jsonwebtoken');

module.exports = id => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}

// jwt.sign(
//   { userId: user.id }, // обект с даними которые будут зашифрованы в jwt token
//   config.get('jwtSecret'), // секретный ключ
//   { expiresIn: '1h' } //обект через сколько jwt token закончит свое сущиствование
// )
