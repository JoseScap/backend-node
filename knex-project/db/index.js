const { SQLITE_FILENAME } = require('../config');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: SQLITE_FILENAME,
  },
  useNullAsDefault: true,
  log: {
    debug: function(message) { console.log(message) }
  }
});

knex.schema.createTableIfNotExists('products', function(table) {
  table.increments()
  table.string('name')
  table.string('description').nullable()
}).then(response => console.log('`products` table: ', response)).catch((error) => console.log(error))

module.exports = knex
