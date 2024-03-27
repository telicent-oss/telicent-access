import { v4 as uuidv4 } from "uuid";

import TestResponse from "../../../testUtils";
import usersModel from "../../../database/models/Users";
import { createUser } from "../create";

const mockingoose = require("mockingoose");

describe("SCIM User - Create", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should return the created user", async () => {
    const uuid = uuidv4();
    const mockResponse = new TestResponse();

    mockingoose(usersModel).toReturn({}, "save");

    await createUser(true)(
      {
        body: {
          externalId: uuid,
          userName: "name",
          displayName: "FirstName MiddleName LastName",
          emails: [
            {
              value: "email1",
            },
            {
              value: "email2",
              primary: true,
            },
          ],
          groups: [
            "urn:telicent:groups:developers",
            "urn:telicent:groups:group2",
          ],
        },
      },
      mockResponse
    );

    const {
      data,
      data: { id },
    } = mockResponse;
    expect(data).toStrictEqual({
      id,
      externalId: uuid,
      userName: "name",
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      groups: ["urn:telicent:groups:developers", "urn:telicent:groups:group2"],
    });
  });

  it("should handle the error if it fails to create the user", async () => {
    const uuid = uuidv4();
    const mockResponse = new TestResponse();

    mockingoose(usersModel).toReturn({}, "save");

    await createUser(true)(
      {
        body: {
          externalId: uuid,
          emails: [
            {
              value: "email1",
            },
            {
              value: "email2",
              primary: true,
            },
          ],
          groups: [
            "urn:telicent:groups:developers",
            "urn:telicent:groups:group2",
          ],
        },
      },
      mockResponse
    );

    const {
      data: { status, detail },
    } = mockResponse;
    expect(status).toBe(422);
    expect(detail).toBe(
      "Users validation failed: name: Path `name` is required."
    );
  });
});

describe("SCIM User - Update", () => {});
