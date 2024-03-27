import express from "express";
import fs from "fs";
import path from "path";

import config from "../config";

const router = express.Router();
const localPath = `${__dirname}/`;

/**
 * @openapi
 * components:
 *   schemas:
 *     ServerError:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 500
 *         message:
 *           type: string
 *           example: Server error
 */
fs.readdirSync(localPath)
  .filter((file) => {
    if (file === "index.js" || path.extname(file) !== ".js") {
      return false;
    }
    return true;
  })
  .forEach((file) => {
    const filename = file.split(".")[0];
    router.use(`/${filename}`, require(`./${filename}`));
  });

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
router.get("/scim/v2/IsEnabled", (req, res) => {
  res.status(200).send({ isEnabled: config.isScimEnabled });
  return;
});

export default router;
