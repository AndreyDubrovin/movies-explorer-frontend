const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err'); // 404
const BadRequest = require('../errors/bad-request'); // 400
const Unauthorized = require('../errors/unauthorized'); // 401
const ConflictingRequest = require('../errors/сonflicting-request'); // 401

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const badrequest = new BadRequest('Переданы некорректные данные user id.');
        next(badrequest);
      } else {
        next(err);
      }
    });
};

module.exports.editUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const badrequest = new BadRequest('Переданы некорректные данные при измненении пользователя.');
        next(badrequest);
      } else if (err.name === 'CastError') {
        const badrequest = new BadRequest('Переданы некорректные данные user id.');
        next(badrequest);
      } else if (err.name === 'MongoError' && err.code === 11000) {
        const conflictingRequest = new ConflictingRequest('Почта уже существует');
        next(conflictingRequest);
      } else {
        next(err);
      }
    });
};

module.exports.registerUser = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.cookie('jwt', `Bearer ${token}`, {
        maxAge: 3600000 * 24 * 7,

      }).send({
        data: {
          name: user.name, email: user.email, _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const badrequest = new BadRequest('Переданы некорректные данные при создании пользователя.');
        next(badrequest);
      } else if (err.name === 'MongoError' && err.code === 11000) {
        const conflictingRequest = new ConflictingRequest('Почта уже существует');
        next(conflictingRequest);
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res
        .cookie('jwt', `Bearer ${token}`, {
          maxAge: 3600000 * 24 * 7,

        })
        .send({
          data: {
            name: user.name,
            email: user.email,
            _id: user._id,
          },
        });
    })
    .catch((err) => {
      const unauthorized = new Unauthorized(err.message);
      next(unauthorized);
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ data: 'выход успешен' });
};
/* httpOnly: true,
sameSite: true,
 */
