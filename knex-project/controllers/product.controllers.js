const db = require("../db")
const { fatalErrorResponse, okResponse, noContentResponse, createdResponse, notFoundResponse } = require("../utils/response.utils")

/**
 * Creates a new product.
 * 
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const createProduct = async (req, res) => {
  const { name, description } = req.body;
  try {
    // Insert the new product into the database
    const product = await db.table('products').insert({ name, description });

    // Respond with the newly created product
    createdResponse(res, product);
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);
    // Respond with a fatal error message if something goes wrong during insertion
    fatalErrorResponse(res, 'Something went wrong');
  }
};


/**
 * Lists all products.
 * 
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const listAllProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await db.table('products');
    
    // Respond with the list of products
    okResponse(res, products);
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);
    
    // Respond with a fatal error message if something goes wrong
    fatalErrorResponse(res, 'Something went wrong');
  }
};


/**
 * Deletes a product by its ID.
 * 
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const deleteProductById = async (req, res) => {
  const { id } = req.body;
  try {
    // Delete the product from the database by its ID
    await db.table('products').where('id', id).del();
    
    // Respond with a success status code
    noContentResponse(res);
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);
    
    // Respond with a fatal error message if something goes wrong
    fatalErrorResponse(res, 'Something went wrong');
  }
};

/**
 * Write a description
 * 
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const listProductById = async (req, res) => {
  const { id } = req.query;
  try {
    // Delete the product from the database by its ID
    const products = await db.select().from('products').where('id', id);
    
    if (products.length === 0) {
      notFoundResponse(res, `Product with \'id\' ${id} does not exist`)
      return undefined
    }

    // Respond with a success status code
    okResponse(res, products);
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);
    
    // Respond with a fatal error message if something goes wrong
    fatalErrorResponse(res, 'Something went wrong');
  }
};

module.exports = {
  createProduct,
  listAllProducts,
  deleteProductById,
  listProductById
}