import { awsCreateUser, awsDeleteUser, awsInit, awsUpdateUser } from "./aws";
import { kcCreateUser, kcDeleteUser, kcInit, kcUpdateUser } from "./keycloak";
import config from "../config";

const { authType } = config;

const createLookup = {
  aws: awsCreateUser,
  keycloak: kcCreateUser,
};

const updateLookup = {
  aws: awsUpdateUser,
  keycloak: kcUpdateUser,
};

const deleteLookup = {
  aws: awsDeleteUser,
  keycloak: kcDeleteUser,
};

const initLookup = {
  aws: awsInit,
  keycloak: kcInit,
};

/**
 * Create user in auth provider
 * @param {object} user - should match user schema
 * @returns {string} id
 */
export const createAuthUser = createLookup[authType];

/**
 * Update user in auth provider
 * @param {object} user - should match user schema
 */
export const updateAuthUser = updateLookup[authType];

/**
 * Delete user in auth provider
 * @param {object} user - should match user schema
 */
export const deleteAuthUser = deleteLookup[authType];

/**
 * Synchronise auth users with Mongo
 * Any users in the auth application that are missing in Mongo will be
 * automatically created.
 */
export const init = initLookup[authType];
