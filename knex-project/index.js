const express = require('express')
const { PORT } = require('./config')
const rootRouter = require('./routers/index.router')

const app = express()

app.use('/api', rootRouter)

app.listen(PORT, () => console.log('Server running on port', PORT))