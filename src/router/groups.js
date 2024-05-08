import express from "express";
import {
  getAll,
  createGroup,
  deleteGroup,
  getGroup,
} from "../controllers/groups";

const router = express.Router();

/**
 * @openapi
 * /groups:
 *   get:
 *     summary: Get all groups
 *     tags:
 *       - Groups
 *     description: Returns all groups
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved array of groups
 *         content:
 *          application/json:
 *           schema:
 *            items:
 *             $ref: '#/components/schemas/Group'
 *       404:
 *         description: Groups not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupsNotFound'
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
 * /groups/{group_id}:
 *   get:
 *     summary: Get specific group by group_id
 *     tags:
 *       - Groups
 *     description: Get specific group by its ID
 *     parameters:
 *       - in: path
 *         name: group_id
 *         description: unique identifier for groups
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved group
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Group'
 *                 - type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       example: [{ "_id": "6540c6f026bc7a0bd665849f", "id": "6540c6f026bc7a0bd665849f", "name": "Example Name", "active": true }]
 *       404:
 *         description: Group not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupsNotFound'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get("/:group_id", getGroup);

/**
 * @openapi
 * /groups:
 *   post:
 *     summary: Create a new group
 *     tags:
 *       - Groups
 *     description: Creates a new group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGroup'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Created group ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateGroupSuccess'
 *       400:
 *         description: Invalid request / Fields missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupBadRequest'
 *       409:
 *         description: Group already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupAlreadyExists'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.post("/", createGroup);

/**
 * @openapi
 * /groups/{group_id}:
 *   delete:
 *     summary: Delete specific group by group_id
 *     tags:
 *       - Groups
 *     description: Delete group from access - soft delete which removes the group from use by updating it to be inactive
 *     parameters:
 *       - in: path
 *         name: group_id
 *         description: unique identifier for groups
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully soft deleted group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteGroupSuccess'
 *       404:
 *         description: Group not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupsNotFound'
 */
router.delete("/:group_id", deleteGroup);

module.exports = router;
