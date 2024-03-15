const { createProduct, listAllProducts } = require('../controllers/index.controllers')

const rootRouter = require('express').Router()

rootRouter.post('/create-product', createProduct)
rootRouter.get('/list-all-products', listAllProducts)

module.exports = rootRouter