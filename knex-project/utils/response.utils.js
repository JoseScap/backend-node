/**
 * Sends a successful response with data (HTTP 200).
 * 
 * @param {import('express').Response} response The response object.
 * @param {any} data The data to be sent in the response.
 */
const okResponse = (response, data) => response.status(200).json({
  data,
  status: 200,
  errors: null
});

/**
 * Sends a successful response with data (HTTP 201).
 * 
 * @param {import('express').Response} response The response object.
 * @param {any} data The data to be sent in the response.
 */
const createdResponse = (response, data) => response.status(201).json({
  data,
  status: 201,
  errors: null
});


/**
 * Sends a no content response.
 * 
 * @param {import('express').Response} response The response object.
 */
const noContentResponse = (response) => response.status(204).end();


/**
 * Sends a bad request response with errors (HTTP 400).
 * 
 * @param {import('express').Response} response The response object.
 * @param {any} errors The errors to be sent in the response.
 */
const badRequestResponse = (response, errors) => {
  let array = []
  if (Array.isArray(errors)) array = errors
  else array = [errors]

  return response.status(400).json({
    data: null,
    status: 400,
    errors: array
  })
};

/**
 * Sends a response indicating that the requested resource was not found (HTTP 404).
 * 
 * @param {import('express').Response} response The response object.
 * @param {any} errors The errors to be sent in the response.
 */
const notFoundResponse = (response, errors) => {
  // If errors is not an array, convert it to an array
  let errorArray = Array.isArray(errors) ? errors : [errors];

  // Send a JSON response with a 404 status code and error details
  return response.status(404).json({
    data: null,
    status: 404,
    errors: errorArray
  });
};


/**
 * Sends a fatal error response with errors (HTTP 500).
 * 
 * @param {import('express').Response} response The response object.
 * @param {any} errors The errors to be sent in the response.
 */
const fatalErrorResponse = (response, errors) => {
  let array = [];
  if (Array.isArray(errors)) array = errors;
  else array = [errors];

  return response.status(500).json({
    data: null,
    status: 500,
    errors: array
  });
};


module.exports = {
  okResponse,
  createdResponse,
  noContentResponse,
  badRequestResponse,
  notFoundResponse,
  fatalErrorResponse
}