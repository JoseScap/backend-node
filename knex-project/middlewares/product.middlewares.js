const { body, query, checkSchema } = require('express-validator')

const createProductValidation = [
    body('name').notEmpty().withMessage('Field \'name\' is required'),
    body('name').isString().withMessage('Field \'name\' must be a string'),
    body('description').optional().isString().withMessage('Field \'description\' must be a string')
]

const deleteProductByIdValidation = [
    query('id').notEmpty().withMessage('Field \'id\' is required'),
    query('id').isInt().withMessage('Field \'id\' must be an integer')
]

const listProductByIdValidation = [
    query('id').notEmpty().withMessage('Field \'id\' is required'),
    query('id').isInt().withMessage('Field \'id\' must be an integer')
]

const createProductsBulkValidation = [
    body().isArray().withMessage('Request body must be an array'),
    body('*').custom((value, { req }) => {
        if (!value.name || typeof value.name !== 'string') {
            throw new Error('Field \'name\' is required and must be a string');
        }
        if (value.description && typeof value.description !== 'string') {
            throw new Error('Field \'description\' must be a string');
        }
        return true;
    })
];

module.exports = {
    createProductValidation,
    deleteProductByIdValidation,
    listProductByIdValidation,
    createProductsBulkValidation
}