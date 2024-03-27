import express from "express";
import {
  getAll,
  getHierarchy,
  getHierarchyLookup,
} from "../controllers/hierarchies";

const router = express.Router();

/**
 * @openapi
 * /hierarchies:
 *   get:
 *     summary: Get all hierarchies
 *     tags:
 *       - Hierarchies
 *     description: Returns all hierarchies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved all hierarchies
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Hierarchy'
 *       404:
 *         description: Hierarchies not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HierarchyNotFound'
 */
router.get("/", getAll);

/**
 * @openapi
 * /hierarchies/{hierarchyId}:
 *   get:
 *     summary: Get hierarchy with id :hierarchyId
 *     tags:
 *       - Hierarchies
 *     description: Returns hierarchy with specified ID
 *     parameters:
 *       - in: path
 *         name: hierarchyId
 *         description: Identifier of requested hierarchy
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved hierarchy
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
router.get("/:hierarchyId", getHierarchy);

/**
 * @openapi
 * /hierarchies/lookup/{name}:
 *   get:
 *     summary: Look up hierarchy by name
 *     tags:
 *       - Hierarchies
 *     description: Looks up hierarchy by name, using the dataAttributeName or userAttributeName property of the hierarchy attribute
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
 *           description: isUserAttribute being set to true tells ACCESS to look up the hierarchy using the userAttributeName property rather than dataAttributeName
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
