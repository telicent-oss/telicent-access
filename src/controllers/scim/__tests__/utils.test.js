import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { mapScimToUser, mapMongoToScim } from "../utils";

describe("SCIM Utils", () => {
  it("should return user", async () => {
    const uuid = uuidv4();

    const scim = {
      externalId: uuid,
      userName: "name",
      emails: [
        {
          value: "email1",
        },
        {
          value: "email2",
          primary: true,
        },
      ],
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      groups: ["urn:telicent:groups:developers", "urn:telicent:groups:group2"],
    };

    const user = mapScimToUser(scim);
    const id = user.id;
    const testUser = {
      _id: id,
      id,
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      externalId: uuid,
      name: "name",
      userName: "name",
      email: "email2",
      labels: [],
      groups: ["urn:telicent:groups:developers", "urn:telicent:groups:group2"],
    };

    expect(user).toStrictEqual(testUser);
  });

  it("should return scim user", async () => {
    const id = new Types.ObjectId();
    const uuid = uuidv4();

    const user = {
      _id: id,
      id,
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      externalId: uuid,
      name: "name",
      userName: "name",
      email: "email2",
      labels: [],
      groups: ["urn:telicent:groups:developers", "urn:telicent:groups:group2"],
    };

    const scim = {
      id,
      externalId: uuid,
      userName: "name",
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      groups: ["urn:telicent:groups:developers", "urn:telicent:groups:group2"],
    };

    expect(mapMongoToScim(user)).toStrictEqual(scim);
  });

  it("should map scim user", () => {
    const body = {
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      userName: "engineer@telicent.io",
      name: {
        givenName: "Molly",
        familyName: "P",
      },
      emails: [
        {
          primary: true,
          value: "engineer@telicent.io",
          type: "work",
        },
      ],
      displayName: "Molly P",
      locale: "en-US",
      externalId: "00uauxtud8O6Z5OJV5d7",
      groups: [],
      password: "password123",
      active: true,
    };
    const scimUser = mapScimToUser(body);
    delete scimUser.id;
    delete scimUser._id;
    expect(scimUser).toEqual({
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      externalId: scimUser.externalId,
      userName: scimUser.userName,
      labels: [],
      groups: [],
      email: "engineer@telicent.io",
      name: "Molly P",
    });
  });
});
