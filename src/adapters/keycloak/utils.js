import axios from "axios";
import url from "url";

import config from "../../config";
import logger from "../../lib/logger";

export const retrieveAdminToken = async () => {
  const { authSecretKey, authUrl } = config;
  const params = new url.URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", "admin-cli");
  params.append("client_secret", authSecretKey);

  const options = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };
  try {
    const {
      data: { access_token },
    } = await axios.post(
      `${authUrl}/realms/master/protocol/openid-connect/token`,
      params.toString(),
      options
    );
    return access_token;
  } catch (err) {
    logger.error(err.message);
    return;
  }
};

export const createHeadersWithToken = (token = "changeme") => ({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

/**
 * setFilterArgument -
 * @param {Array<{uuid: string}>} mongoUsers
 * @returns {Function} used in filter expects {id: string}
 */
export const setFilterArgument =
  (mongoUsers = []) =>
  (keycloakUser) =>
    !mongoUsers.some((mongoUser) => mongoUser.externalId === keycloakUser.id);
