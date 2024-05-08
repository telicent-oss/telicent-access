import { updateUser } from "../update";
import * as adapters from "../../../adapters";
import usersModel from "../../../database/models/Users";
import { server } from "../../../mocks";
import TestResponse from "../../../testUtils";

const mockingoose = require("mockingoose");

const mockUser = {
  _id: "64dd02xxxxxxxxxxxcecbe13c",
  id: "64dd02xxxxxxxxxxxcecbe13c",
  externalId: "8bb01245-261e-4609-a4a5-xxxxxxxxxxxx",
  name: "Thomas",
  userName: "headofeng@telicent.io",
  email: "headofeng@telicent.io",
  labels: [
    {
      name: "nationality",
      value: "GBR",
      toString: "nationality='GBR'",
      toDataLabelString: "permitted_nationalities='GBR'",
      _id: "64dd1f2yyyyyyyyyyy90e9ce",
    },
    {
      name: "clearance",
      value: "O",
      toString: "clearance='O'",
      toDataLabelString: "classification='O'",
      _id: "64dd1zzzzzzzzzzzzzz0e9cf",
    },
    {
      name: "personnel_type",
      value: "NON-GOV",
      toString: "personnel_type='NON-GOV'",
      toDataLabelString: null,
      _id: "64dd1faaaaaaaaaaaaa0e9d0",
    },
    {
      name: "deployed_organisation",
      value: "Telicent",
      toString: "deployed_organisation='Telicent'",
      toDataLabelString: "permitted_organisations='Telicent'",
      _id: "64dd1bbbbbbbbbbbbbbbe9d1",
    },
  ],
  active: true,
  groups: [],
  userGroups: ["urn:telicent:groups:developers"],
  schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
};

describe("Users - UPDATE", () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    mockingoose.resetAll();
  });
  afterAll(() => {
    server.close();
  });

  it("should update a user successfully", async () => {
    adapters.updateAuthUser = jest.fn(() => true);
    mockingoose(usersModel)
      .toReturn(mockUser, "findOne")
      .toReturn({ modifiedCount: 1, matchedCount: 1 }, "updateOne");
    const mockRequest = {
      params: {
        id: "64dd02xxxxxxxxxxxcecbe13c",
      },
      body: {
        email: "headofeng@telicent.io",
      },
    };
    const mockResponse = new TestResponse();
    await updateUser(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(adapters.updateAuthUser).toBeCalledWith({
      payload: {
        uuid: "8bb01245-261e-4609-a4a5-xxxxxxxxxxxx",
        email: "headofeng@telicent.io",
      },
    });
    expect(statusCode).toBe(200);
    expect(data).toEqual({
      id: "64dd02xxxxxxxxxxxcecbe13c",
      updated: true,
    });
  });

  it("should handle error when passing invalid request", async () => {
    const mockRequest = {
      params: {
        id: "uuid",
      },
      body: {},
    };
    const mockResponse = new TestResponse();
    await updateUser(mockRequest, mockResponse);

    const {
      statusCode,
      data: { message },
    } = mockResponse;
    expect(statusCode).toBe(400);
    expect(message).toBe("Invalid request");
  });

  it("should handle database errors when attempting to update user", async () => {
    mockingoose(usersModel)
      .toReturn(mockUser, "findOne")
      .toReturn({ modifiedCount: 0, matchedCount: 1 }, "updateOne");
    const mockRequest = {
      params: {
        id: "64dd02xxxxxxxxxxxcecbe13c",
      },
      body: {
        email: "headofeng@telicent.io",
      },
    };
    const mockResponse = new TestResponse();
    await updateUser(mockRequest, mockResponse);

    const {
      statusCode,
      data: { updated },
    } = mockResponse;
    expect(statusCode).toBe(200);
    expect(updated).toBe(false);
  });

  it("updating users - user not found", async () => {
    usersModel.findOne = jest.fn().mockImplementationOnce(() => {
      return null;
    });
    const mockRequest = {
      params: {
        id: "64dd02xxxxxxxxxxxcecbe13c",
      },
      body: {
        email: "headofeng@telicent.io",
      },
    };
    const mockResponse = new TestResponse();
    await updateUser(mockRequest, mockResponse);

    const {
      statusCode,
      data: { message },
    } = mockResponse;
    expect(usersModel.findOne).toBeCalledWith(
      {
        id: "64dd02xxxxxxxxxxxcecbe13c",
      },
      "-_id -__v"
    );
    expect(statusCode).toBe(404);
    expect(message).toBe("User not found");
  });

  it("should handle unexpected errors when attempting to update user", async () => {
    usersModel.findOne = jest.fn().mockImplementationOnce(() => {
      return mockUser;
    });
    usersModel.updateOne = jest.fn().mockImplementationOnce(() => {
      throw new Error("uhoh");
    });
    const mockRequest = {
      params: {
        id: "64dd02xxxxxxxxxxxcecbe13c",
      },
      body: {
        email: "headofeng@telicent.io",
      },
    };
    const mockResponse = new TestResponse();
    await updateUser(mockRequest, mockResponse);

    const {
      statusCode,
      data: { message },
    } = mockResponse;
    expect(statusCode).toBe(422);
    expect(message).toBe("uhoh");
  });

  it("should handle empty update object when attempting to update user", async () => {
    mockingoose(usersModel).toReturn(mockUser, "findOne");
    const mockRequest = {
      params: {
        id: "64dd02xxxxxxxxxxxcecbe13c",
      },
      body: {},
    };
    const mockResponse = new TestResponse();
    await updateUser(mockRequest, mockResponse);

    const {
      statusCode,
      data: { message },
    } = mockResponse;
    expect(statusCode).toBe(400);
    expect(message).toBe("Invalid request");
  });
});
