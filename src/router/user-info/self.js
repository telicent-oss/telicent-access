import express from "express";
import { getUserDetails } from "../../controllers/Users/read";

const router = express.Router();

/**
 * @openapi
 * /user-info/self:
 *   get:
 *     summary: Get user details
 *     tags:
 *       - UserInfo
 *     description: Returns details for the user querying
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully returned full user details
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
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
router.get("/", getUserDetails);

module.exports = router;
