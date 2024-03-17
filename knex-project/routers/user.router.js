const { createUserValidation, deleteUserByIdValidation } = require('../middlewares/user.middlewares')
const { validate } = require('../middlewares/common.middlewares')
const { createUser, listAllUsers, deleteUserById } = require('../controllers/user.controllers')

const Router = require('express').Router

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: Module to manage data related to users
 */
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error. Something went wrong.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
userRouter.post('/create-user', validate(createUserValidation), createUser)
/**
 * @openapi
 * /api/users/list-all-users:
 *   get:
 *     summary: Get a list of all users.
 *     description: Retrieves a list of all users available in the system.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error. Something went wrong.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
userRouter.get('/list-all-users', listAllUsers)
/**
 * @openapi
 * /api/users/delete-user-by-id:
 *   delete:
 *     summary: Delete a user by ID.
 *     description: Deletes a user from the system by its ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to delete.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request. The ID parameter is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error. Something went wrong.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
userRouter.delete('/delete-user-by-id', validate(deleteUserByIdValidation), deleteUserById)

module.exports = userRouter
