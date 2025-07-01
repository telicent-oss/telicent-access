import express from "express";
import cors from "cors";

import config from "./config";
import { buildErrorObject, sendInvalidRequest } from "./controllers/utils";
import { init } from "./database";
import logger from "./lib/logger";
import router from "./router";
import apiDocs from "./router/api-docs";
import DecodeJWT from "./middleware/decode";
import AccessRouter from "./router";

const createServer = async () => {
  const scimJson = "application/scim+json";
  const json = "application/json";
  const mongo = await init();
  const app = express();

  const corsOptions = {
    origin: function (origin, callback) {
      const allowedDomains = [process.env.DEPLOYED_DOMAIN]; // e.g. For local ["http://localhost:8091", "http://localhost:8091"];
      if (!origin || allowedDomains.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(
          new Error(
            `CORS policy does not allow access from the specified origin: ${origin}`
          )
        );
      }
    },
    optionsSuccessStatus: 200, // For legacy browser support
  };
  app.use(cors(corsOptions));
  /**
   * @openapi
   * /health:
   *  get:
   *    summary: Get app health
   *    tags:
   *      - health
   *    description: Responds if the app is up and running
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: App is up and running
   *        content:
   *          application/json
   */
  app.get("/health", (req, res) =>
    res.status(200).send({ server: "ok", mongo: mongo.health })
  );
  app.use("/api-docs", apiDocs);
  app.use(
    express.json({
      type: [scimJson, json],
      verify: (req, res, buffer, encoding) => {
        if (!req.is(scimJson) && !req.is(json)) return sendInvalidRequest(res);
        try {
          JSON.parse(buffer.toString(encoding)); // Try to parse the body buffer.
        } catch (err) {
          res
            .status(400)
            .send(buildErrorObject(400, "Body is not a JSON object"));
          return;
        }
      },
    })
  );
  const decoder = new DecodeJWT(
    config.openidProviderUrl,
    config.jwtHeader,
    config.groupKey
  );
  await decoder.initialize();
  const router = new AccessRouter(decoder.middleware);
  router.init();

  app.use(router.router);
  return app;
};
(async () => {
  const app = await createServer();
  const { port } = config;

  app.listen(port, () => {
    logger.info(`Server started on ${port}`);
  });
})();
