const db = require("../db")
const { badRequestResponse, fatalErrorResponse, okResponse, noContentResponse } = require("../utils/response.utils")

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const createProduct = async (req, res) => {
  const { name, description } = req.body
  if (!name) {
    badRequestResponse(res, 'Name is mandatory')
    return undefined
  }

  try {
    const product = await db.table('products').insert({ name, description })
    okResponse(res, product)
  } catch (error) {
    console.log(error)
    fatalErrorResponse(res, 'Something went wrong')
  }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const listAllProducts = async (req, res) => {
  try {
    const products = await db.table('products')
    okResponse(res, products)
  } catch (error) {
    console.log(error)
    fatalErrorResponse(res, 'Something went wrong')
  }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteProductById = async (req, res) => {
  const { id } = req.body 
  if (!id) {
    badRequestResponse(res, 'Id is mandatory')
    return undefined
  }

  if (!Number.isInteger(id)) {
    badRequestResponse(res, 'Id must be an integer')
    return undefined
  }

  try {
    await db.table('products').where('id', id).del()
    noContentResponse(res)
  } catch (error) {
    console.log(error)
    fatalErrorResponse(res, 'Something went wrong')
  }
}

module.exports = {
  createProduct,
  listAllProducts,
  deleteProductById
}