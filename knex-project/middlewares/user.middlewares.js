const { body } = require("express-validator")

const createUserValidation = [
  body('username').notEmpty().withMessage('Field \'username\' is required'),
  body('username').isLength({ min: 8, max: 20 }).withMessage('Username must be between 8 and 20 characters long.'),
  body('username').isAlphanumeric().withMessage('Field \'username\' must be alphanumeric'),
  body('username').custom((value, { req }) => {
    if (!/^[A-Za-z]/.test(value)) {
      throw new Error('Username must start with a letter.');
    }
    return true;
  }),
  body('password').notEmpty().withMessage('Field \'password\' is required'),
  body('password').isLength({ min: 8, max: 32 }),
  body('password').isAlphanumeric().withMessage('Field \'password\' must be alphanumeric'),
  body('password').custom((value, { req }) => {
    if (!/^[A-Za-z]/.test(value)) {
      throw new Error('Username must start with a letter.');
    }
    return true;
  }),
]

module.exports = {
  createUserValidation
}