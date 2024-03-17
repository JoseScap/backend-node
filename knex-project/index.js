const express = require('express')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const path = require('path')

const rootRouter = require('./routers/index.router')
const swaggerDocument = require('./openapi/index')

const { PORT } = require('./config')
const PUBLIC_DIRECTORY = path.join(__dirname, 'public')

const app = express()

app.use(express.static(PUBLIC_DIRECTORY))

app.use(express.json())

app.use(morgan('dev'))

app.use('/api', rootRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { background-color: #393939; }',
  customCssUrl: '/css/swagger-theme.css'
}))

app.listen(PORT, () => console.log('Server running on port', PORT))
