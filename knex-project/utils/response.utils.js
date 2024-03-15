const okResponse = (data) => ({
  data,
  status: 200,
  errors: null
})

const badRequestResponse = (errors) => {
  let array = []
  if (Array.isArray(errors)) array = errors
  else array = [errors]

  return {
    data: null,
    status: 400,
    errors: array
  }
}

const fatalErrorResponse = (error) => {
  let array = []
  if (Array.isArray(errors)) array = errors
  else array = [errors]

  return {
    data: null,
    status: 500,
    errors: array
  }
}

module.exports = {
  okResponse,
  badRequestResponse,
  fatalErrorResponse
}