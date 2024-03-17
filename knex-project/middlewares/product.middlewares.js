const { body, query } = require('express-validator')

const createProductValidation = [
  body('name').notEmpty().withMessage('Field \'name\' is required'),
  body('name').isString().withMessage('Field \'name\' must be a string'),
  body('description').optional().isString().withMessage('Field \'description\' must be a string')
]

const createProductsBulkValidation = [
  body().isArray().withMessage('Request body must be an array'),
  body('*').custom((value, { req }) => {
    if (!value.name || typeof value.name !== 'string') {
      throw new Error('Field \'name\' is required and must be a string')
    }
    if (value.description && typeof value.description !== 'string') {
      throw new Error('Field \'description\' must be a string')
    }
    return true
  })
]

const listProductByIdValidation = [
  query('id').notEmpty().withMessage('Field \'id\' is required'),
  query('id').isInt().withMessage('Field \'id\' must be an integer')
]

const listProductsByFiltersValidation = [
  query('name').optional().isString().withMessage('Field \'name\' must be a string'),
  query('nameLike').optional().isString().withMessage('Field \'nameLike\' must be a string'),
  query('description').optional().isString().withMessage('Field \'description\' must be a string'),
  query('descriptionLike').optional().isString().withMessage('Field \'descriptionLike\' must be a string'),
  query('orderBy')
    .optional()
    .isString()
    .isIn(['id', 'name', 'description'])
    .withMessage('Field \'orderBy\' must be one of: id, name, description'),
  query('order')
    .optional()
    .isString()
    .isIn(['asc', 'desc'])
    .withMessage('Field \'order\' must be one of: asc, desc'),
  query('itemsPerPage').optional().isInt({ min: 1, max: 20 }).withMessage('Field \'itemsPerPage\' must be an integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Field \'page\' must be an integer')
]

const deleteProductByIdValidation = [
  query('id').notEmpty().withMessage('Field \'id\' is required'),
  query('id').isInt().withMessage('Field \'id\' must be an integer')
]

const deleteProductsByIdBulkValidation = [
  query('ids').isArray().withMessage('The IDs parameter must be an array'),
  query('ids.*').isInt().withMessage('All IDs must be integers')
]

module.exports = {
  createProductValidation,
  createProductsBulkValidation,
  listProductByIdValidation,
  listProductsByFiltersValidation,
  deleteProductByIdValidation,
  deleteProductsByIdBulkValidation
}
