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
 * Handles the creation of multiple products in bulk.
 * 
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const createProductsBulk = async (req, res) => {
  // Extract the array of products from the request body
  const products = req.body;
  try {
    // Insert the new products into the database
    const createdProducts = await db.table('products').insert(products);

    // Respond with the newly created products
    createdResponse(res, createdProducts);
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);
    // Respond with a fatal error message if something goes wrong during insertion
    fatalErrorResponse(res, 'Something went wrong');
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
 * Retrieves a product from the database by its ID.
 * 
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const listProductById = async (req, res) => {
  const { id } = req.query;
  try {
    // Retrieve the product from the database by its ID
    const product = await db.select().from('products').where('id', id).first();

    if (!product) {
      // Respond with a not found error message if the product does not exist
      notFoundResponse(res, `Product with ID ${id} does not exist`);
      return;
    }

    // Respond with the product data
    okResponse(res, product);
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    // Respond with a fatal error message if something goes wrong
    fatalErrorResponse(res, 'Something went wrong');
  }
};


/**
 * Retrieves products from the database based on specified filters.
 * 
 * @param {import('express').Request} req The request object containing filter parameters.
 * @param {import('express').Response} res The response object to send the products.
 */
const listProductsByFilters = async (req, res) => {
  const { name, nameLike, descriptionLike, orderBy, order, itemsPerPage = 10, page = 1 } = req.query;

  try {
    // Use knex.transaction() to wrap database operations in a transaction, ensuring data consistency
    await db.transaction(async (trx) => {
      let query = db.select().from('products').transacting(trx); // Start building the query

      // Apply filters
      if (name) {
        query = query.where('name', name);
      }

      if (nameLike) {
        query = query.andWhereRaw('LOWER(name) LIKE ?', [`%${nameLike.toLowerCase()}%`]);
      }

      if (descriptionLike) {
        query = query.andWhereRaw('LOWER(description) LIKE ?', [`%${descriptionLike.toLowerCase()}%`]);
      }

      // Apply sorting
      query = query.orderBy(orderBy ?? 'id', order ?? 'asc');

      // Apply pagination
      query = query.limit(itemsPerPage).offset(itemsPerPage * (page - 1));

      // Execute the query
      const products = await query;

      // Commit the transaction
      await trx.commit();

      // Respond with the products
      okResponse(res, products);
    });
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
  const { id } = req.query;
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
 * Handles the deletion of multiple products by their IDs in bulk.
 * 
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 */
const deleteProductsByIdBulk = async (req, res) => {
  // Extract the IDs from the query parameters
  const { ids } = req.query;
  try {
    // Delete the products from the database by their IDs
    await db.table('products').whereIn('id', ids).del();

    // Respond with a success status code (204 No Content)
    noContentResponse(res);
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    // Respond with a fatal error message if something goes wrong
    fatalErrorResponse(res, 'Something went wrong');
  }
};

module.exports = {
  createProduct,
  createProductsBulk,
  listAllProducts,
  listProductById,
  listProductsByFilters,
  deleteProductById,
  deleteProductsByIdBulk,
}