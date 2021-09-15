const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { editUserProfile, getCurrentUser, logout } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/signout', logout);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), editUserProfile);

module.exports = router;
