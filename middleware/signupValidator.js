const { body, validationResult } = require('express-validator');
const UserService = require('../services/UserService');

const userValidationRules = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email cannot be empty')
      .bail()
      .isEmail()
      .withMessage('Email is not valid')
      .bail()
      .custom(async (email) => {
        const user = await UserService.findByEmail(email);
        if (user) {
          throw new Error('Email already in used. Please use another one');
        }
      }),
    body('password')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .bail()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .bail()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).+$/)
      .withMessage(
        'Password must contain at least 1 lower character, 1 upper character, 1 digit character, 1 special character'
      ),
    body('confirm_password', "Your password confirmation doesn't match").custom(
      (value, { req }) => value === req.body.password
    ),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const validationErrors = {};
  errors
    .array()
    .forEach((error) => (validationErrors[error.param] = error.msg));

  return res.status(400).send({ errors: validationErrors });
};

module.exports = {
  userValidationRules,
  validate,
};
