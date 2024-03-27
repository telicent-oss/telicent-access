import axios from "axios";
import mongoose from "mongoose";

import { USER_REALM_URL } from "./constants";
import {
  createHeadersWithToken,
  retrieveAdminToken,
  setFilterArgument,
} from "./utils";
import { getAllUsers } from "../../controllers";
import usersModel from "../../database/models/Users";
import logger from "../../lib/logger";

const createMongoUser = (user) => {
  const obj = new usersModel(mapUserToMongo(user));
  return obj.save();
};

export default async () => {
  const token = await retrieveAdminToken();

  if (!token) {
    logger.error("Token is undefined");
    logger.error("Failed to sync Keycloak with Mongo");
    return;
  }

  // Add existing users.
  const { error, data: mongoUsers } = await getAllUsers("externalId");
  if (error) return logger.error("Error fetching users from keycloak");

  logger.debug(`mongoUsers ${mongoUsers}`);
  const authUsers = await getAllAuthUsers(token);
  logger.debug(`authUsers ${authUsers}`);
  const findMissingUsers = setFilterArgument(mongoUsers);

  await Promise.all(
    authUsers.filter(findMissingUsers).map(createMongoUser)
  ).catch((err) => {
    console.error(err);
  });
};

export const isValidUser = (user = {}) =>
  user.hasOwnProperty("email") && user.hasOwnProperty("id");

export const mapUserToMongo = (user = {}) => {
  if (Object.keys(user).length === 0 || !isValidUser(user)) return {};

  const { id: externalId, firstName, lastName, username, email } = user;
  let name = `${firstName} ${lastName || ""}`.trim();
  if (!firstName && !lastName && username) {
    name = username;
  }

  const id = mongoose.Types.ObjectId();
  const mapped = {
    _id: id,
    id,
    externalId,
    name,
    labels: [],
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    groups: [],
    email,
  };

  return mapped;
};

/**
 * Get all users from keycloak
 * @param {string} token
 * @returns
 */
export const getAllAuthUsers = async (token) => {
  const { data } = await axios.get(
    USER_REALM_URL,
    createHeadersWithToken(token)
  );
  return data;
};
