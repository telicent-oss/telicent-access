import express from "express";
import codes from "../data/country-code";

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Countries:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             example: United Kingdom
 *           alpha2:
 *             type: string
 *             example: GB
 *           alpha3:
 *             type: string
 *             example: GBR
 */
const countrylookup = codes.map(({ Country, Alpha2, Alpha3 }) => ({
  name: Country.trim(),
  alpha2: Alpha2.trim(),
  alpha3: Alpha3.trim(),
}));

/**
 * @openapi
 * /countries:
 *   get:
 *     summary: Get a list of all available countries
 *     tags:
 *       - Countries
 *     description: Returns all countries
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of countries
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Countries'
 */
router.get("/", (req, res) => {
  res.send(countrylookup);
});

module.exports = router;
