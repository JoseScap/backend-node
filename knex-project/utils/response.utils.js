const ApiResponse = require('../dtos/ApiResponse')

/**
 * Sends a successful response with data (HTTP 200).
 *
 * @param {import('express').Response} response The response object.
 * @param {any} data The data to be sent in the response.
 */
const okResponse = (response, data) => response.status(200).json(new ApiResponse(data, 200, null))

/**
 * Sends a successful response with data (HTTP 201).
 *
 * @param {import('express').Response} response The response object.
 * @param {any} data The data to be sent in the response.
 */
const createdResponse = (response, data) => response.status(201).json(new ApiResponse(data, 201, null))

/**
 * Sends a no content response.
 *
 * @param {import('express').Response} response The response object.
 */
const noContentResponse = (response) => response.status(204).end()

/**
 * Sends a bad request response with errors (HTTP 400).
 *
 * @param {import('express').Response} response The response object.
 * @param {any} errors The errors to be sent in the response.
 */
const badRequestResponse = (response, errors) => {
  let errorArray = []
  if (Array.isArray(errors)) errorArray = errors
  else errorArray = [errors]

  return response.status(400).json(new ApiResponse(null, 400, errorArray))
}

/**
 * Sends a response indicating that the requested resource was not found (HTTP 404).
 *
 * @param {import('express').Response} response The response object.
 * @param {any} errors The errors to be sent in the response.
 */
const notFoundResponse = (response, errors) => {
  // If errors is not an array, convert it to an array
  const errorArray = Array.isArray(errors) ? errors : [errors]

  // Send a JSON response with a 404 status code and error details
  return response.status(404).json(new ApiResponse(null, 404, errorArray))
}

/**
 * Sends a fatal error response with errors (HTTP 500).
 *
 * @param {import('express').Response} response The response object.
 * @param {any} errors The errors to be sent in the response.
 */
const fatalErrorResponse = (response, errors) => {
  let errorArray = []
  if (Array.isArray(errors)) errorArray = errors
  else errorArray = [errors]

  return response.status(500).json(new ApiResponse(null, 500, errorArray))
}

module.exports = {
  okResponse,
  createdResponse,
  noContentResponse,
  badRequestResponse,
  notFoundResponse,
  fatalErrorResponse
}
