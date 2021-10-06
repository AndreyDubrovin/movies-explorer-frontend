const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized'); // 401

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const authorization = req.cookies.jwt;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const forbidden = new Unauthorized('Необходима авторизация');
    return next(forbidden);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    const unauthorized = new Unauthorized('Необходима авторизация');
    return next(unauthorized);
  }
  req.user = payload;

  return next();
};
