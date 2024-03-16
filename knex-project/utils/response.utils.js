/**
 * @param {import('express').Response} response 
 * @param {any} data 
 */
const okResponse = (response, data) => response.status(200).json({
  data,
  status: 200,
  errors: null
})

/**
 * @param {import('express').Response} response 
 */
const noContentResponse = (response) => response.status(204).end()

/**
 * @param {import('express').Response} response 
 * @param {any} errors 
 */
const badRequestResponse = (response, errors) => {
  let array = []
  if (Array.isArray(errors)) array = errors
  else array = [errors]

  return response.status(500).json({
    data: null,
    status: 400,
    errors: array
  })
}

/**
 * @param {import('express').Response} response 
 * @param {any} errors 
 */
const fatalErrorResponse = (response, errors) => {
  let array = []
  if (Array.isArray(errors)) array = errors
  else array = [errors]

  return response.status(500).json({
    data: null,
    status: 500,
    errors: array
  })
}

module.exports = {
  okResponse,
  noContentResponse,
  badRequestResponse,
  fatalErrorResponse
}