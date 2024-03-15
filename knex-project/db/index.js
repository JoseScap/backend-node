const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite',
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
})

module.exports = knex
