const express = require('express')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')

const rootRouter = require('./routers/index.router')
const swaggerDocument = require('./openapi/index')

const { PORT } = require('./config')

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use('/api', rootRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => console.log('Server running on port', PORT))