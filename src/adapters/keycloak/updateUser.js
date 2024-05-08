import axios from "axios";

import { USER_REALM_URL } from "./constants";
import { createHeadersWithToken, retrieveAdminToken } from "./utils";
import logger from "../../lib/logger";

const updateUserInKeyCloak = async ({ uuid, payload }, token) => {
  const { email, name, deployed_organisation } = payload;
  const userDetails = {
    username: email,
    firstName: name,
    lastName: deployed_organisation,
    email,
  };
  logger.debug(`update user: ${payload}, ${userDetails}`);
  const options = createHeadersWithToken(token);
  return await axios.put(`${USER_REALM_URL}/${uuid}`, userDetails, options);
};

export default async (payload) =>
  updateUserInKeyCloak(payload, await retrieveAdminToken());
