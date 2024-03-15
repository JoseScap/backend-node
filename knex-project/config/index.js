const PORT = process.env.PORT ?? 3000
const SQLITE_FILENAME = process.env.SQLITE_FILENAME ?? './mydb.sqlite'

module.exports = {
    PORT,
    SQLITE_FILENAME
}