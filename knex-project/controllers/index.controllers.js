const db = require("../db")
const { badRequestResponse, fatalErrorResponse, okResponse } = require("../utils/response.utils")

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const createProduct = async (req, res) => {
  const { name, description } = req.body
  if (!name) {
    res.status(400).json(badRequestResponse('Name is mandatory'))
    return undefined
  }

  try {
    const product = await db.table('products').insert({ name, description })
    res.json(okResponse(product))
  } catch (error) {
    console.log(error)
    res.status(500).json(fatalErrorResponse('Something went wrong'))
  }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const listAllProducts = async (req, res) => {
  try {
    const products = await db.table('products')
    res.json(okResponse(products))
  } catch (error) {
    console.log(error)
    res.status(500).json(fatalErrorResponse('Something went wrong'))
  }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteProductById = async (req, res) => {
  const { id } = req.body 
  if (!id) {
    res.status(400).json(badRequestResponse('Id is mandatory'))
    return undefined
  }

  if (!Number.isInteger(id)) {
    res.status(400).json(badRequestResponse('Id must be an integer'))
    return undefined
  }

  try {
    await db.table('products').where('id', id).del()
    res.status(204).end()
  } catch (error) {
    console.log(error)
    res.status(500).json(fatalErrorResponse('Something went wrong'))
  }
}

module.exports = {
  createProduct,
  listAllProducts,
  deleteProductById
}