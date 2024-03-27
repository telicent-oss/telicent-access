import { v4 as uuidv4 } from "uuid";

import usersModel from "../../../database/models/Users";
import TestResponse from "../../../testUtils";
import { deactivateUser } from "../deactivate";

const mockingoose = require("mockingoose");

describe("SCIM User - Deactivate", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should successfully deactivate a user", async () => {
    const id = uuidv4();
    const mockResponse = new TestResponse();
    const mockRequest = { params: { id } };

    mockingoose(usersModel).toReturn({ deactivated: id }, "updateOne");
    await deactivateUser(true)(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toBe(200);
  });

  it("should successfully handle error on unsuccessful deactivation of a user", async () => {
    const mockResponse = new TestResponse();
    const mockRequest = { params: { id: "uuid" } };

    mockingoose(usersModel).toReturn({ deactivatedCount: 0 }, "updateOne");
    await deactivateUser(true)(mockRequest, mockResponse);

    const {
      statusCode,
      data: { detail },
    } = mockResponse;
    expect(statusCode).toBe(422);
    expect(detail).toBe("User deactivation failed");
  });

  it("should successfully handle error on unexpected error", async () => {
    const mockResponse = new TestResponse();
    const mockRequest = { params: { id: "uuid" } };

    mockingoose(usersModel).toReturn(
      new Error("User deactivation failed"),
      "deleteOne"
    );
    await deactivateUser(true)(mockRequest, mockResponse);

    const {
      statusCode,
      data: { detail },
    } = mockResponse;
    expect(statusCode).toBe(422);
    expect(detail).toBe("User deactivation failed");
  });
});
