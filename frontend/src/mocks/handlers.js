import { rest } from "msw";
import {
  countries,
  exampleAttrs,
  exampleGroups,
  exampleHierarchy,
  exampleLabels,
  exampleUsers,
  exampleUser,
} from "../testUtils";

const handlers = (ACCESS_API_URL) => [
  rest.get(`${ACCESS_API_URL}/users`, (request, response, ctx) =>
    response(ctx.status(200), ctx.json(exampleUsers))
  ),

  rest.get(`${ACCESS_API_URL}/users/:id`, ({ params: { id } }, response, ctx) =>
    id
      ? response(ctx.status(200), ctx.json(exampleUser))
      : response(
          ctx.status(404),
          ctx.json({
            code: 404,
            message: "User not found",
          })
        )
  ),

  rest.get(
    `${ACCESS_API_URL}/users/lookup/:email`,
    (request, response, ctx) => {
      const attributes = Object.entries(exampleUsers[1].attributes);
      const formattedUserResponse = {
        attributes: attributes.map(
          (attribute) => `${attribute[0]}=${attribute[1]}`
        ),
      };

      return response(
        ctx.status(200),
        ctx.json({
          attributes: formattedUserResponse,
        })
      );
    }
  ),

  rest.post(`${ACCESS_API_URL}/users`, (request, response, ctx) =>
    response(
      ctx.status(201),
      ctx.json({
        message: "User created.",
        ok: true,
      })
    )
  ),

  rest.patch(`${ACCESS_API_URL}/users/:id`, (request, response, ctx) =>
    response(ctx.status(200), ctx.json({ res: "User updated." }))
  ),

  rest.delete(`${ACCESS_API_URL}/users/:id`, (request, response, ctx) =>
    response(ctx.status(200), ctx.json({ res: "User deleted." }))
  ),

  rest.get(`${ACCESS_API_URL}/countries`, (request, response, ctx) =>
    response(ctx.status(200), ctx.json(countries))
  ),

  rest.get(`${ACCESS_API_URL}/hierarchies`, (request, response, ctx) =>
    response(ctx.status(200), ctx.json([exampleHierarchy]))
  ),

  rest.get(
    `${ACCESS_API_URL}/hierarchies/lookup/clearance`,
    (request, response, ctx) =>
      response(ctx.status(200), ctx.json(exampleHierarchy))
  ),

  rest.get(`${ACCESS_API_URL}/hierarchies`, (request, response, ctx) =>
    response(ctx.status(200), ctx.json([]))
  ),

  rest.post(`${ACCESS_API_URL}/hierarchies/:id`, (request, response, ctx) =>
    response(ctx.status(200))
  ),

  rest.patch(`${ACCESS_API_URL}/hierarchies/:id`, (request, response, ctx) =>
    response(ctx.status(200))
  ),

  rest.delete(`${ACCESS_API_URL}/hierarchies/:id`, (request, response, ctx) =>
    response(ctx.status(200))
  ),

  rest.get(`${ACCESS_API_URL}/attributes`, (request, response, ctx) =>
    response(ctx.status(200), ctx.json(exampleAttrs))
  ),

  rest.get(`${ACCESS_API_URL}/groups`, (request, response, ctx) =>
    response(ctx.status(200), ctx.json(exampleGroups))
  ),

  rest.get(`${ACCESS_API_URL}/labels`, (request, response, ctx) =>
    response(ctx.status(200), ctx.json(exampleLabels))
  ),

  rest.get(`${ACCESS_API_URL}/scim/v2/IsEnabled`, (request, response, ctx) =>
    response(ctx.status(200), ctx.json({ isEnabled: false }))
  ),

  // Catch others.
  rest.get("*", ({ url }, response, ctx) => {
    // eslint-disable-next-line no-console
    console.error(`Please add request handler for ${url.toString()}`);
    return response(
      ctx.status(500),
      ctx.json({ error: "Please add request handlers." })
    );
  }),
];

export default handlers;
