import axios from "axios";

import { USER_REALM_URL } from "./constants";
import { createHeadersWithToken, retrieveAdminToken } from "./utils";

const deleteUserFromKeyCloak = async (id, token) =>
  await axios.delete(`${USER_REALM_URL}/${id}`, createHeadersWithToken(token));

export default async (payload) =>
  deleteUserFromKeyCloak(payload, await retrieveAdminToken());
