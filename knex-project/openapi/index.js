const swaggerJsdoc = require('swagger-jsdoc')

const openapiSpecifications = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Knex APP',
            version: '0.1.0',
        },
    },
    apis: ['./routers/*.js'],
})

module.exports = openapiSpecifications