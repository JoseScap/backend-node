/**
 * @openapi
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           nullable: true
 *           description: The data of the response if request was successful.
 *         status:
 *           type: integer
 *           format: int32
 *           enum: [200, 201, 204, 400, 404, 500]
 *           description: The status code of the response.
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           nullable: true
 *           description: Array containing errors if request was not succesful.
 *       example:
 *         data: {}
 *         status: 500
 *         errors: ['Something went wrong']
 */

class ApiResponse {
  constructor(data = null, status = 500, errors = ['Something went wrong']) {
    this.data = data
    this.status = status
    this.errors = errors
  }
}

module.exports = ApiResponse
