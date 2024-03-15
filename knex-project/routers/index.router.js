const { createProduct } = require('../controllers/index.controllers')

const rootRouter = require('express').Router()

rootRouter.post('/create-product', createProduct)

module.exports = rootRouter