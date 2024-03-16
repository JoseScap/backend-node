const { createProduct, listAllProducts, deleteProductById } = require('../controllers/index.controllers')

const rootRouter = require('express').Router()

rootRouter.post('/create-product', createProduct)
rootRouter.get('/list-all-products', listAllProducts)
rootRouter.delete('/delete-product-by-id', deleteProductById)

module.exports = rootRouter