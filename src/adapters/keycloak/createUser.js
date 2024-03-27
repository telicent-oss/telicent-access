import axios from "axios";

import { USER_REALM_URL } from "./constants";
import { createHeadersWithToken, retrieveAdminToken } from "./utils";
import logger from "../../lib/logger";

const createUserInKeyCloak = async (payload, token) => {
  const { name, email, deployedOrganisation, temporaryPassword } = payload;
  const options = createHeadersWithToken(token);

  const newUser = {
    username: email,
    email,
    emailVerified: "true",
    enabled: true,
    groups: [],
    firstName: name,
    lastName: deployedOrganisation,
    credentials: [
      {
        type: "password",
        value: temporaryPassword,
        temporary: true, // Bug in Keycloak dummy property; does nothing.
      },
    ],
    requiredActions: ["UPDATE_PASSWORD"],
  };

  const { headers, status } = await axios.post(
    USER_REALM_URL,
    newUser,
    options
  );
  logger.debug(`CreateUserInKeyCloak: ${headers?.location}`);

  if (status === 201) return headers.location.replace(`${USER_REALM_URL}/`, "");
};

export default async (payload) =>
  createUserInKeyCloak(payload, await retrieveAdminToken());
