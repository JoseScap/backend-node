const { body } = require('express-validator')

const createProductValidation = [
    body('name').notEmpty().withMessage('Field \'name\' is required'),
    body('name').isString().withMessage('Field \'name\' must be a string'),
    body('description').optional().isString().withMessage('Field \'description\' must be a string')
]

module.exports = {
    createProductValidation
}