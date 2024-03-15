const express = require('express')
const { PORT } = require('./config')
const rootRouter = require('./routers/index.router')
const morgan = require('morgan')

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use('/api', rootRouter)

app.listen(PORT, () => console.log('Server running on port', PORT))