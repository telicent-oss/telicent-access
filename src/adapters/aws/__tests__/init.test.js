import aws from "aws-sdk";

import { isValidUser, mapUserToMongo } from "../init";
import { server } from "../../../mocks";

const mockResponse = {
  User: {
    Username: "Username",
    Attributes: [
      { Name: "email", Value: "email" },
      { Name: "sub", Value: "sub" },
    ],
  },
};

jest.mock("aws-sdk", () => ({
  CognitoIdentityServiceProvider: class {
    adminInitiateAuth = () => this;
    adminCreateUser = () => this;
    promise = () => Promise.resolve(mockResponse);
  },
}));

describe("AWS(Cognito) Init", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("should return false if user is invalid", () => {
    expect(isValidUser({})).toBeFalsy();
    expect(isValidUser("")).toBeFalsy();
    expect(
      isValidUser({
        Username: "Username",
      })
    ).toBeFalsy();
    expect(
      isValidUser({
        Attributes: [{ Name: "email", Value: "Email" }],
      })
    ).toBeFalsy();
  });

  it("should handle invalid input", () => {
    expect(mapUserToMongo()).toEqual({});
    expect(mapUserToMongo({ Username: "Username" })).toEqual({});
  });

  it("should return valid mongo user", () => {
    const user = {
      Username: "userName",
      Attributes: [
        { Name: "email", Value: "email" },
        { Name: "sub", Value: "sub" },
      ],
    };

    const actual = mapUserToMongo(user);
    const { Username, Attributes } = user;
    const expected = {
      name: `${Username}`,
      externalId: Attributes.find((attr) => attr.Name === "sub").Value,
      labels: [],
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      groups: [],
      email: "email",
      userName: "userName",
    };

    // Remove Mongo ID - impure and unimportant.
    delete actual._id;
    delete actual.id;

    expect(actual).toEqual(expected);
  });

  describe("Run init function", () => {});
});
