import { rest } from "msw";

import { USER_REALM_URL } from "../adapters/keycloak/constants";
import config from "../config";

export const handlers = [
  rest.get(USER_REALM_URL, (req, res, ctx) =>
    res(
      ctx.status(200, "successful"),
      ctx.json([
        {
          id: "id",
          createdTimestamp: 1678277495545,
          username: "username",
          enabled: true,
          totp: false,
          emailVerified: true,
          firstName: "firstName",
          lastName: "lastName",
          email: "email",
          disableableCredentialTypes: [],
          requiredActions: [],
          notBefore: 0,
          access: {
            manageGroupMembership: true,
            view: true,
            mapRoles: true,
            impersonate: false,
            manage: true,
          },
        },
      ])
    )
  ),
  rest.post(
    `${config.authUrl}/realms/master/protocol/openid-connect/token`,
    (req, res, ctx) =>
      res(
        ctx.status(200, "successful"),
        ctx.json({
          access_token: "token",
        })
      )
  ),
  rest.post(USER_REALM_URL, (req, res, ctx) =>
    res(
      ctx.status(201, "successful"),
      ctx.json({}),
      ctx.set("location", `${USER_REALM_URL}/uuid`)
    )
  ),
  rest.delete(`${USER_REALM_URL}/id`, (req, res, ctx) =>
    res(ctx.status(200, "successful"), ctx.json({}))
  ),
  rest.delete(`${USER_REALM_URL}/uuid`, (req, res, ctx) =>
    res(ctx.status(200, "successful"), ctx.json({}))
  ),
  rest.put(`${USER_REALM_URL}/id`, (req, res, ctx) =>
    res(ctx.status(200, "successful"), ctx.json({}))
  ),
  rest.put(`${USER_REALM_URL}/uuid`, (req, res, ctx) =>
    res(ctx.status(200, "successful"), ctx.json({}))
  ),
];

export default handlers;
