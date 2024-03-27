import aws from "aws-sdk";

import { server } from "../../../mocks";
import createUser from "../createUser";

const mockResponse = {
  User: {
    Username: "Username",
  },
};

jest.mock("aws-sdk", () => ({
  CognitoIdentityServiceProvider: class {
    adminInitiateAuth = () => this;
    adminCreateUser = () => this;
    promise = () => Promise.resolve(mockResponse);
  },
}));

describe("AWS - create user", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("should create user", async () => {
    const uuid = await createUser("email");
    expect(uuid).toBe("Username");
  });
});
