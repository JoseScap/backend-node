const { createProduct, listAllProducts, deleteProductById } = require('../controllers/index.controllers')
const { validate } = require('../middlewares/common.middlewares')
const { createProductValidation, deleteProductByIdValidation } = require('../middlewares/product.middlewares')

const rootRouter = require('express').Router()

/**
 * @openapi
 * /api/create-product:
 *   post:
 *     description: Create a new product.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error. Something went wrong.
 */
rootRouter.post('/create-product', validate(createProductValidation), createProduct)
rootRouter.get('/list-all-products', listAllProducts)
rootRouter.delete('/delete-product-by-id', validate(deleteProductByIdValidation), deleteProductById)

module.exports = rootRouter