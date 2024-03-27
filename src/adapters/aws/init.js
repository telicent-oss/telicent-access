import usersModel from "../../database/models/Users";
import { cognito, mapAwsToScim, setFilterArgument } from "./utils";
import config from "../../config";
import { getAllUsers } from "../../controllers";
import logger from "../../lib/logger";

export default async () => {
  const [authError, authUsers] = await getAllAuthUsers();

  if (authError) {
    logger.error(`Failed to get cognito users. reason: ${authError.message}`);
    return;
  }
  const { error: mongoError, data: mongoUsers } = await getAllUsers(
    "externalId"
  );
  if (mongoError) {
    logger.error(`Failed to get mongo users. reason: ${mongoError.message}`);
    return;
  }
  const findMissingUsers = setFilterArgument(mongoUsers);
  const usersToCreate = authUsers.filter(findMissingUsers);
  await Promise.all(usersToCreate.map(createMongoUser));
};

const createMongoUser = (user) => {
  logger.debug(user);
  const mapped = mapUserToMongo(user);

  const obj = new usersModel(mapped);
  return obj.save();
};

export const getAllAuthUsers = async () => {
  try {
    const { Users } = await cognito
      .listUsers({ UserPoolId: config.authUserPoolId })
      .promise();
    return [null, Users];
  } catch (e) {
    return [e];
  }
};

const setUserAttributes = (acc, { Name, Value }) => {
  if (Name === "email") {
    acc[Name] = Value;
  }
  return acc;
};

export const isValidUser = (user = {}) =>
  user.hasOwnProperty("Username") &&
  user.hasOwnProperty("Attributes") &&
  Array.isArray(user.Attributes);

export const mapUserToMongo = (user = {}) => {
  if (Object.keys(user).length === 0 || !isValidUser(user)) return {};

  const mongoUser = user.Attributes.reduce(
    setUserAttributes,
    mapAwsToScim(user)
  );

  return mongoUser;
};
