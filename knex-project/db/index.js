/* eslint-disable space-before-function-paren */
const { SQLITE_FILENAME } = require('../config')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: SQLITE_FILENAME
  },
  useNullAsDefault: true,
  log: {
    debug: function (message) { console.log(message) }
  }
});

(async function knexSetup() {
  const productTableExists = await knex.schema.hasTable('products')
  if (!productTableExists) {
    await knex.schema.createTable('products', table => {
      table.increments()
      table.string('name').notNullable()
      table.string('description').nullable()
    })
  }
  const userTableExists = await knex.schema.hasTable('users')
  if (!userTableExists) {
    await knex.schema.createTable('users', table => {
      table.increments()
      table.string('username', 20).notNullable().unique().index()
      table.string('password', 32).notNullable()
    })
  }
})()

module.exports = knex
