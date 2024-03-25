const express = require('express');
const { ValidateSignUp, ValidateLogin } = require('../middlewares/validations');
const { createUser, Login, FetchUser, UpdateUser } = require('../controllers/User');
const authenticationMiddleware = require('../middlewares/auth');
const router = express.Router();

router.route('/signup').post(ValidateSignUp, createUser);

router.route('/login').post(ValidateLogin, Login);

router.route('/').get(authenticationMiddleware, FetchUser)

router.route('/update').put(UpdateUser);

module.exports = router;