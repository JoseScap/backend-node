const { SQLITE_FILENAME } = require('../config');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: SQLITE_FILENAME,
  },
  useNullAsDefault: true,
  log: {
    debug: function (message) { console.log(message) }
  }
});

(async function knexSetup(){
  const productsExists = await knex.schema.hasTable('products')
  if (!productsExists) {
    knex.schema.createTable('products', table => {
      table.increments()
      table.string('name')
      table.string('description').nullable()
    })
  }
})()


module.exports = knex
