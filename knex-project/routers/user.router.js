const { createUserValidation } = require('../middlewares/user.middlewares')
const { validate } = require('../middlewares/common.middlewares')
const { createUser } = require('../controllers/user.controllers')

const Router = require('express').Router

const userRouter = Router()
/**
 * @openapi
 * /api/users/create-user:
 *   post:
 *     summary: Create a new user.
 *     description: Create a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username for the new user. It must be between 8 and 20 characters long and start with a letter. Only alphanumeric characters are allowed.
 *                 minLength: 8
 *                 maxLength: 20
 *               password:
 *                 type: string
 *                 description: Password for the new user. It must be between 8 and 20 characters long and start with a letter. Only alphanumeric characters are allowed.
 *                 minLength: 8
 *                 maxLength: 32
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error. Something went wrong.
 */
userRouter.post('/create-user', validate(createUserValidation), createUser)

module.exports = userRouter