import express from "express";
import {
  getHierarchyLookup,
} from "../../controllers/hierarchies";

const router = express.Router();

/**
 * @openapi
 * /hierarchies/lookup/{name}:
 *   get:
 *     summary: Look up hierarchy by name
 *     tags:
 *       - Hierarchies
 *     description: Looks up hierarchy by name, using the data_attribute_name or user_attribute_name property of the hierarchy attribute
 *     parameters:
 *       - in: path
 *         name: name
 *         description: Name of the the hierarchy to be looked up
 *       - in: query
 *         name: isUserAttribute
 *         schema:
 *           type: boolean
 *           required: false
 *           default: false
 *           description: isUserAttribute being set to true tells ACCESS to look up the hierarchy using the user_attribute_name property rather than data_attribute_name
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully looked up hierarchy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hierarchy'
 *       404:
 *         description: Hierarchy not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HierarchyNotFound'
 */
router.get("/lookup/:name", getHierarchyLookup);

module.exports = router;
