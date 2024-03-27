import express from "express";
import cors from "cors";

import config from "./config";
import { buildErrorObject, sendInvalidRequest } from "./controllers/utils";
import { init } from "./database";
import logger from "./lib/logger";
import router from "./router";
import userRouter from "./router/user-info";

const createServer = async () => {
  const scimJson = "application/scim+json";
  const json = "application/json";
  const mongo = await init();
  const app = express();
  app.use(cors());

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
    res.status(200).send({ server: "ok", mongo: mongo.getHealth() })
  );

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

  app.use(router);
  app.use(userRouter);
  return app;
};
(async () => {
  const app = await createServer();
  const { port } = config;

  app.listen(port, () => {
    logger.info(`Server started on ${port}`);
  });
})();
