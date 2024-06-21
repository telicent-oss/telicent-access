import express from "express";
import fs from "fs";
import path from "path";

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



export default router;
