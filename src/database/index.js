import { connect, connection } from "mongoose";

import { createDefaultAttributes } from "./defaults";
import models from "./models";
import { init as SynchroniseUsers } from "../adapters";
import config from "../config";
import { getAllAttributes } from "../controllers/attributes/read";
import logger from "../lib/logger";

export const init = async () => {
  let health = { ok: true, message: "starting up" };

  const connectDb = async () => {
    try {
      const {
        mongoCollection,
        mongoPwd,
        mongoRetryRewrites,
        mongoUrl,
        mongoUser,
      } = config;

      if (health.message !== "connection") {
        health = { ...health, message: "reconnecting" };
      }
      logger.info("Connecting to database...");
      logger.info(`Mongo: ${mongoUrl}`);
      logger.info(`Database: ${mongoCollection}`);
      logger.info(`User: ${mongoUser}`);

      const encodedPwd = encodeURIComponent(mongoPwd);
      await connect(
        `mongodb://${mongoUser}:${encodedPwd}@${mongoUrl}/${mongoCollection}`,
        {
          retryWrites: mongoRetryRewrites,
        }
      );
    } catch (err) {
      health = { ok: false, message: "errored" };
      logger.error(`Failed to connect to Mongo: ${err.message}`);
      return;
    }

    logger.info("*** DB connected successfully ***\n");
    logger.info("Loading models...");
    loadModels();
    logger.info("Models loaded");

    // Check to make sure a default hierarchy exists.
    logger.info("Checking attributes collection");
    const { data, error } = await getAllAttributes();
    if (error) {
      logger.error(error);
      health = {
        ok: false,
        message: "error thrown trying to access attributes",
      };
    }
    // If attributes collection is empty, add default hierarchy.
    if (data.length === 0) {
      logger.info("Labels status: FAILED");
      const { error: err } = await createDefaultAttributes();

      if (err) {
        health = { ok: false, message: "failed to create default attributes" };
        return;
      }
    }
    logger.info("Labels status: PASSED");
    logger.info("Synchronising keycloak users with database");
    SynchroniseUsers(); // Ensure Keycloak and Mongo users match.
    health = { ok: true, message: "connected" };
  };

  connection.on("error", async () => {
    health = { ok: false, message: "errored" };
    logger.error("Failed to connect to database");
    await sleep(2500);
    await connectDb();
  });

  connection.on("disconnect", async () => {
    health = { ok: false, message: "disconnected" };
    logger.info("disconnected");
    await sleep(2500);
    await connectDb();
  });

  health = { ok: true, message: "connecting" };
  await connectDb();
  return { health };
};

const loadModels = () => {
  models();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
