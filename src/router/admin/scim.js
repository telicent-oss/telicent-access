import express from "express";

import config from "../../config";

const router = express.Router();

/**
 * @openapi
 * /scim/v2/IsEnabled:
 *   get:
 *     summary: Get SCIM enabled status
 *     tags:
 *       - SCIM
 *     description: Get if SCIM is configured for the back end - i.e. an external IdP is being used to managed users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: SCIM enabled status returned
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 isEnabled:
 *                   type: boolean
 *                   example: true
 */
router.get("/v2/IsEnabled", (req, res) => {

    res.status(200).send({ isEnabled: config.isScimEnabled });
    return;
  });

module.exports = router;