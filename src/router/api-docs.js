import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import config from "../config";
import log from "../lib/logger";
import { version } from "../../package.json";

const router = express.Router();
const { accessUrl, port } = config;

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Telicent ACCESS",
      version,
      description: "Telicent ACCESS API",
      contact: {
        name: "Telicent",
        url: "https://telicent.io",
        email: "info@telicent.io",
      },
    },
    servers: [{ url: accessUrl }],
  },
  apis: [
    "./src/database/models/*.js",
    "./src/router/*.js",
    "./src/router/user-info/*.js",
  ],
};

const specs = swaggerJsdoc(options);

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(specs, { explorer: true }));

router.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

log.info(`Docs available at http://localhost:${port}/api-docs`);
log.info(
  `Swagger config available at http://localhost:${port}/api-docs/swagger.json`
);

module.exports = router;
