import express from "express";
import {
  getAll,
  getHierarchy,
} from "../../controllers/hierarchies";

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


module.exports = router;
