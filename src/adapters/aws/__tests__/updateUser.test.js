import aws from "aws-sdk";
import { describe } from "node:test";

import updateUser from "../updateUser";
import { server } from "../../../mocks";

const mockResponse = {};

jest.mock("aws-sdk", () => ({
  CognitoIdentityServiceProvider: class {
    adminInitiateAuth = () => this;
    adminCreateUser = () => this;
    adminUpdateUserAttributes = () => this;
    promise = () => Promise.resolve(mockResponse);
  },
}));

describe("AWS - Update User", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("should update user", () => {
    const res = updateUser({ payload: { email: "email", uuid: "uuid" } });
    expect(res).resolves.not.toThrowError();
  });
});
