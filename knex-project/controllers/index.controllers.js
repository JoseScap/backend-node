const db = require("../db")
const { badRequestResponse, fatalErrorResponse, okResponse, noContentResponse } = require("../utils/response.utils")

/**
 * Creates a new product.
 * 
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const createProduct = async (req, res) => {
  const { name, description } = req.body;

  // Check if the 'name' property is provided in the request body
  if (!name) {
    // Respond with a bad request error if 'name' is missing
    badRequestResponse(res, 'Name is mandatory');
    return undefined; // Exit function early
  }

  try {
    // Insert the new product into the database
    const product = await db.table('products').insert({ name, description });

    // Respond with the newly created product
    okResponse(res, product);
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

  // Check if 'id' is provided in the request body
  if (!id) {
    // Respond with a bad request error if 'id' is missing
    badRequestResponse(res, 'Id is mandatory');
    return undefined; // Exit function early
  }

  // Check if 'id' is an integer
  if (!Number.isInteger(id)) {
    // Respond with a bad request error if 'id' is not an integer
    badRequestResponse(res, 'Id must be an integer');
    return undefined; // Exit function early
  }

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


module.exports = {
  createProduct,
  listAllProducts,
  deleteProductById
}