import express from "express";

import { createUserIfNotExist } from "../../controllers/Users/read";
// import { isUser } from "../../middleware/authz";
import { getUserDetails } from "../../controllers/Users/read";

const router = express.Router();
// router.use(isUser)

/**
 * @openapi
 * /whoami:
 *   get:
 *     summary: Gets who user is, will create if no user exists
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
 *       422:
 *         description: Operation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInvalid'
 */
router.get("/whoami", createUserIfNotExist)


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
router.get("/user-info/self", getUserDetails);
export default router;
