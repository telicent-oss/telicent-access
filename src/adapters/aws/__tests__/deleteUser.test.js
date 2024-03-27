import aws from "aws-sdk";
import deleteUser from "../deleteUser";

jest.mock("aws-sdk", () => ({
  CognitoIdentityServiceProvider: class {
    adminDeleteUser = () => this;
    promise = () => Promise.resolve(jest.fn());
  },
}));

describe("AWS - Delete User", () => {
  it("should successfully delete user from aws", () => {
    expect(deleteUser("id")).resolves.not.toThrowError();
  });
});
