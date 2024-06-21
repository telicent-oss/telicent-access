import express from "express";
import config from "../../config";

import {
  getAll,
  getUserAttributes,
  updateUser,
  deleteUser,
  deactivateUser
} from "../../controllers";

const router = express.Router();
const {isScimEnabled} = config

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json:
 *     responses:
 *       200:
 *         description: An array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       422:
 *         description: Operation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInvalid'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get("/", getAll);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     description: Returns user based on specified ID
 *     parameters:
 *       - in: path
 *         name: id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFound'
 *       422:
 *         description: Operation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInvalid'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get("/:id", getUserAttributes);

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Update an existing user
 *     tags:
 *       - Users
 *     description: Updates an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully updated an existing user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserSuccess'
 *       400:
 *         description: Failed to update user - invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInvalidRequest'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFound'
 *       422:
 *         description: Operation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInvalid'
 */
router.patch("/:id", updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete existing user
 *     tags:
 *       - Users
 *     description: Deletes an existing user by specified ID (if SCIM is enabled, delete is a soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully deleted existing user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUserSuccess'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFound'
 *       422:
 *         description: User delete failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInvalid'
 *             example:
 *               code: 422
 *               message: User delete failed
 */
if (!isScimEnabled) {
  router.delete("/:id", deleteUser);
} else {
  router.delete("/:id", deactivateUser);
}
module.exports = router;
