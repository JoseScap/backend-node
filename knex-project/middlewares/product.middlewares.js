const { body } = require('express-validator')

const createProductValidation = [
    body('name').notEmpty().withMessage('Field \'name\' is required'),
    body('name').isString().withMessage('Field \'name\' must be a string'),
    body('description').optional().isString().withMessage('Field \'description\' must be a string')
]

const deleteProductByIdValidation = [
    body('id').notEmpty().withMessage('Field \'id\' is required'),
    body('id').isInt().withMessage('Field \'id\' must be an integer')
]

module.exports = {
    createProductValidation,
    deleteProductByIdValidation
}