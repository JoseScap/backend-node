const Router = require('express').Router
const { createProduct, listAllProducts, deleteProductById } = require('../controllers/product.controllers')
const { validate } = require('../middlewares/common.middlewares')
const { createProductValidation, deleteProductByIdValidation } = require('../middlewares/product.middlewares')

const productRouter = Router()
/**
 * @openapi
 * /api/products/create-product:
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
productRouter.post('/create-product', validate(createProductValidation), createProduct)
productRouter.get('/list-all-products', listAllProducts)
productRouter.delete('/delete-product-by-id', validate(deleteProductByIdValidation), deleteProductById)

module.exports = productRouter