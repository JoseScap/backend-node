const Router = require('express').Router
const productRouter = require('./product.router')
const userRouter = require('./user.router')

const rootRouter = Router()
rootRouter.use('/products', productRouter)
rootRouter.use('/users', userRouter)

module.exports = rootRouter
