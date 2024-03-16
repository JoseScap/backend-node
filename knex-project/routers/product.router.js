const Router = require('express').Router
const { createProduct, listAllProducts, deleteProductById } = require('../controllers/product.controllers')
const { validate } = require('../middlewares/common.middlewares')
const { createProductValidation, deleteProductByIdValidation } = require('../middlewares/product.middlewares')

const productRouter = Router()
/**
 * @openapi
 * /api/products/create-product:
 *   post:
 *     summary: Create a new product.
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
/**
 * @openapi
 * /api/products/list-all-products:
 *   get:
 *     summary: Get a list of all products.
 *     description: Retrieves a list of all products available in the system.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: A list of products retrieved successfully.
 *       500:
 *         description: Internal server error. Something went wrong.
 */
productRouter.get('/list-all-products', listAllProducts)
/**
 * @openapi
 * /api/products/delete-product-by-id:
 *   delete:
 *     summary: Delete a product by ID.
 *     description: Deletes a product from the system by its ID.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the product to delete.
 *             required:
 *               - id
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 *       400:
 *         description: Bad request. The request body is missing or invalid.
 *       500:
 *         description: Internal server error. Something went wrong.
 */
productRouter.delete('/delete-product-by-id', validate(deleteProductByIdValidation), deleteProductById)

module.exports = productRouter