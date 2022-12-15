const express = require('express');
const authController = require('../controllers/authController');

const {
  userValidationRules,
  validate,
} = require('../middleware/signupValidator');

const router = express.Router();

router.post('/signup', userValidationRules(), validate, authController.signup);

module.exports = router;
