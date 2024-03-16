const Router = require('express').Router
const { createProduct, listAllProducts, deleteProductById, listProductById, createProductsBulk, deleteProductsByIdBulk, listProductsByFilters } = require('../controllers/product.controllers')
const { validate } = require('../middlewares/common.middlewares')
const { createProductValidation, deleteProductByIdValidation, listProductByIdValidation, createProductsBulkValidation, deleteProductsByIdBulkValidation, listProductsByFiltersValidation } = require('../middlewares/product.middlewares')

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
 * /api/products/create-products-bulk:
 *   post:
 *     summary: Create multiple products at once.
 *     description: Create multiple products at once by providing an array of product objects.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the product.
 *                 description:
 *                   type: string
 *                   description: The description of the product.
 *               required:
 *                 - name
 *     responses:
 *       201:
 *         description: Products created successfully.
 *       400:
 *         description: Bad request. The request body is missing or invalid.
 *       500:
 *         description: Internal server error. Something went wrong.
 */
productRouter.post('/create-products-bulk', validate(createProductsBulkValidation), createProductsBulk)
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
 * /api/products/list-product-by-id:
 *   get:
 *     summary: Get product details by ID.
 *     description: Retrieves details of a product from the system by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to retrieve.
 *     responses:
 *       200:
 *         description: Product details retrieved successfully.
 *       400:
 *         description: Bad request. The request body is missing or invalid.
 *       404:
 *         description: Product not found. The specified ID does not exist.
 *       500:
 *         description: Internal server error. Something went wrong.
 */
productRouter.get('/list-product-by-id', validate(listProductByIdValidation), listProductById)
/**
 * @openapi
 * /api/products/list-products-by-filters:
 *   get:
 *     summary: Get products based on filters.
 *     description: Retrieves products from the system based on specified filters.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The name of the product to filter by.
 *       - in: query
 *         name: nameLike
 *         schema:
 *           type: string
 *         required: false
 *         description: The partial name of the product to filter by.
 *       - in: query
 *         name: descriptionLike
 *         schema:
 *           type: string
 *         required: false
 *         description: The partial description of the product to filter by.
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [id, name, description]
 *         required: false
 *         description: The field by which to order the products. Only 'id', 'name', or 'description' are allowed. Defaults to 'id'.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         required: false
 *         description: The order direction ('asc' for ascending, 'desc' for descending). Defaults to 'asc'.
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *         required: false
 *         description: The number of products to display per page (minimum 1, maximum 20).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: The page number of the results to retrieve (minimum 1).
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *       400:
 *         description: Bad request. The request contains invalid parameters.
 *       500:
 *         description: Internal server error. Something went wrong.
 */
productRouter.get('/list-products-by-filters', validate(listProductsByFiltersValidation), listProductsByFilters)
/**
 * @openapi
 * /api/products/delete-product-by-id:
 *   delete:
 *     summary: Delete a product by ID.
 *     description: Deletes a product from the system by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to delete.
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 *       400:
 *         description: Bad request. The ID parameter is missing or invalid.
 *       500:
 *         description: Internal server error. Something went wrong.
 */
productRouter.delete('/delete-product-by-id', validate(deleteProductByIdValidation), deleteProductById)
/**
 * @openapi
 * /api/products/delete-products-by-id-bulk:
 *   delete:
 *     summary: Delete products by IDs in bulk.
 *     description: Deletes multiple products from the system by their IDs in bulk.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         required: true
 *         description: An array containing the IDs of the products to delete.
 *     responses:
 *       204:
 *         description: Products deleted successfully.
 *       400:
 *         description: Bad request. The IDs parameter is missing or invalid.
 *       500:
 *         description: Internal server error. Something went wrong.
 */
productRouter.delete('/delete-products-by-id-bulk', validate(deleteProductsByIdBulkValidation), deleteProductsByIdBulk)

module.exports = productRouter