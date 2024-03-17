const db = require('../db')
const { createdResponse, fatalErrorResponse, badRequestResponse } = require('../utils/response.utils')

/**
 * Creates a new user.
 *
 * @param {import('express').Request} req The request object containing filter parameters.
 * @param {import('express').Response} res The response object to send the products.
 */
const createUser = async (req, res) => {
  const { username, password } = req.body
  const trx = await db.transaction() // Start a transaction
  try {
    const exist = await trx.select().from('users').where('username', username).first()
    if (exist) {
      return badRequestResponse(res, 'Username already exists')
    }

    const user = await trx('users').insert({ username, password })
    await trx.commit()

    return createdResponse(res, user)
  } catch (error) {
    await trx.rollback()
    console.log(error)
    return fatalErrorResponse(res, 'Something went wrong')
  }
}

module.exports = {
  createUser
}
