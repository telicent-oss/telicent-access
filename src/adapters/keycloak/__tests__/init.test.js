import { getAllAuthUsers, isValidUser, mapUserToMongo } from "../init";
import { server } from "../../../mocks";

describe("Keycloak Init", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("handles invalid input", () => {
    expect(mapUserToMongo()).toEqual({});
    expect(mapUserToMongo({ firstName: "bob" })).toEqual({});
    expect(mapUserToMongo({ lastName: "bob" })).toEqual({});
    expect(mapUserToMongo({ email: "bob@test.com" })).toEqual({});
  });

  it("should return valid mongo user", () => {
    const user = {
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      id: "id",
    };

    const actual = mapUserToMongo(user);
    const { id, firstName, lastName, email } = user;
    const expected = {
      externalId: id,
      name: `${firstName} ${lastName}`,
      email,
      labels: [],
      groups: [],
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    };

    // Remove Mongo ID - impure and unimportant.
    delete actual._id;
    delete actual.id;
    expect(actual).toEqual(expected);
  });

  it("should return false if user is invalid", () => {
    expect(isValidUser({})).toBeFalsy();
    expect(isValidUser("")).toBeFalsy();
    expect(
      isValidUser({
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
      })
    ).toBeFalsy();
  });

  it("should return true if user is valid", () => {
    expect(
      isValidUser({
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        id: "id",
      })
    ).toBeTruthy();
  });

  it("should query keycloak for all users", async () => {
    expect(await getAllAuthUsers("token")).toEqual([
      {
        access: {
          impersonate: false,
          manage: true,
          manageGroupMembership: true,
          mapRoles: true,
          view: true,
        },
        createdTimestamp: 1678277495545,
        disableableCredentialTypes: [],
        email: "email",
        emailVerified: true,
        enabled: true,
        firstName: "firstName",
        id: "id",
        lastName: "lastName",
        notBefore: 0,
        requiredActions: [],
        totp: false,
        username: "username",
      },
    ]);
  });
});
