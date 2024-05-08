import express from "express";
import { getAll, getAttribute } from "../controllers/attributes";

const router = express.Router();

/**
 * @openapi
 * /attributes:
 *   get:
 *     summary: Get all attributes
 *     tags:
 *       - Attributes
 *     description: Returns all attributes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved array of attributes
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Attributes'
 *       404:
 *         description: Attributes not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttributesNotFound'
 */
router.get("/", getAll);

/**
 * @openapi
 * /attributes/{_id}:
 *   get:
 *     summary: Get specific attribute by ID
 *     tags:
 *       - Attributes
 *     parameters:
 *       - in: path
 *         name: _id
 *         description: unique identifier for attribute
 *     description: Get specific attribute by ID
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved attribute
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attributes'
 *       404:
 *         description: Attribute not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttributesNotFound'
 */
router.get("/:_id", getAttribute);

module.exports = router;
