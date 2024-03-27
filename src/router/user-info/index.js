import fs from "fs";
import path from "path";
import express from "express";

import config from "../../config";
import decode from "../../middleware/decode";

const localPath = `${__dirname}/`;
const router = express.Router();
router.use(decode(config.jwksUrl));

fs.readdirSync(localPath)
  .filter((file) => {
    if (file === "index.js" || path.extname(file) !== ".js") {
      return false;
    }
    return true;
  })
  .forEach((file) => {
    const filename = file.split(".")[0];
    router.use(`/user-info/${filename}`, require(`./${filename}`));
  });

export default router;
