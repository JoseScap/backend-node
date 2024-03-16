const Router = require('express').Router
const productRouter = require('./product.router')

const rootRouter = Router()
rootRouter.use('/products', productRouter)

module.exports = rootRouter