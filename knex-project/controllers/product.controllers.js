const db = require('../db')
const { fatalErrorResponse, okResponse, noContentResponse, createdResponse, notFoundResponse } = require('../utils/response.utils')

/**
 * Creates a new product.
 *
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const createProduct = async (req, res) => {
  const { name, description } = req.body
  try {
    const product = await db.table('products').insert({ name, description })
    createdResponse(res, product)
  } catch (error) {
    console.log(error)
    fatalErrorResponse(res, 'Something went wrong')
  }
}

/**
 * Handles the creation of multiple products in bulk.
 *
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const createProductsBulk = async (req, res) => {
  const products = req.body
  try {
    const createdProducts = await db.table('products').insert(products)
    createdResponse(res, createdProducts)
  } catch (error) {
    console.log(error)
    fatalErrorResponse(res, 'Something went wrong')
  }
}

/**
 * Lists all products.
 *
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
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
 * Retrieves a product from the database by its ID.
 *
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const listProductById = async (req, res) => {
  const { id } = req.query
  try {
    const product = await db.select().from('products').where('id', id).first()
    if (!product) {
      notFoundResponse(res, `Product with ID ${id} does not exist`)
      return
    }

    okResponse(res, product)
  } catch (error) {
    console.error(error)
    fatalErrorResponse(res, 'Something went wrong')
  }
}

/**
 * Retrieves products from the database based on specified filters.
 *
 * @param {import('express').Request} req The request object containing filter parameters.
 * @param {import('express').Response} res The response object to send the products.
 */
const listProductsByFilters = async (req, res) => {
  const { name, nameLike, descriptionLike, orderBy, order, itemsPerPage = 10, page = 1 } = req.query

  try {
    await db.transaction(async (trx) => {
      let query = db.select().from('products').transacting(trx)

      if (name) {
        query = query.where('name', name)
      }
      if (nameLike) {
        query = query.andWhereRaw('LOWER(name) LIKE ?', [`%${nameLike.toLowerCase()}%`])
      }
      if (descriptionLike) {
        query = query.andWhereRaw('LOWER(description) LIKE ?', [`%${descriptionLike.toLowerCase()}%`])
      }

      query = query.orderBy(orderBy ?? 'id', order ?? 'asc')
      query = query.limit(itemsPerPage).offset(itemsPerPage * (page - 1))

      const products = await query

      await trx.commit()
      okResponse(res, products)
    })
  } catch (error) {
    console.log(error)
    fatalErrorResponse(res, 'Something went wrong')
  }
}

/**
 * Deletes a product by its ID.
 *
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const deleteProductById = async (req, res) => {
  const { id } = req.query
  try {
    await db.table('products').where('id', id).del()
    noContentResponse(res)
  } catch (error) {
    console.log(error)
    fatalErrorResponse(res, 'Something went wrong')
  }
}

/**
 * Handles the deletion of multiple products by their IDs in bulk.
 *
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const deleteProductsByIdBulk = async (req, res) => {
  const { ids } = req.query
  try {
    await db.table('products').whereIn('id', ids).del()
    noContentResponse(res)
  } catch (error) {
    console.error(error)
    fatalErrorResponse(res, 'Something went wrong')
  }
}

module.exports = {
  createProduct,
  createProductsBulk,
  listAllProducts,
  listProductById,
  listProductsByFilters,
  deleteProductById,
  deleteProductsByIdBulk
}
