/**
 * Sends a successful response with data.
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
 * Sends a successful response with data and status 201 (Created).
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
 * Sends a bad request response with errors.
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
 * Sends a fatal error response with errors.
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
  fatalErrorResponse
}