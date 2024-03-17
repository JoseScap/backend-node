const { validationResult } = require('express-validator')
const { badRequestResponse } = require('../utils/response.utils')

const validate = validations => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req)
      if (result.errors.length) break
    }

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    badRequestResponse(res, errors.array()[0].msg)
  }
}

module.exports = {
  validate
}
