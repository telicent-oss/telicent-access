import { deactivateUser, deleteUser } from "../delete";
import * as adapters from "../../../adapters";
import usersModel from "../../../database/models/Users";
import { server } from "../../../mocks";
import TestResponse from "../../../testUtils";

const mockingoose = require("mockingoose");

describe("Users - DELETE", () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    mockingoose.resetAll();
  });
  afterAll(() => {
    server.close();
  });

  it("should successfully delete a user", async () => {
    adapters.deleteAuthUser = jest.fn(() => true);
    mockingoose(usersModel)
      .toReturn(
        {
          deletedCount: 1,
        },
        "deleteOne"
      )
      .toReturn({ externalId: "aaa-bbb-ccc" }, "findOne");

    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        id: "abc-123",
      },
    };
    await deleteUser(mockRequest, mockResponse);

    expect(adapters.deleteAuthUser).toHaveBeenCalledTimes(1);
    expect(adapters.deleteAuthUser).toBeCalledWith("aaa-bbb-ccc");
    expect(mockResponse.statusCode).toBe(200);
  });

  it("should successfully handle error on unsuccessful deleting of a user", async () => {
    adapters.deleteAuthUser = jest.fn(() => true);
    mockingoose(usersModel)
      .toReturn({ externalId: "aaa-bbb-ccc" }, "findOne")
      .toReturn({ deletedCount: 0 }, "deleteOne");

    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        id: "uuid",
      },
    };
    await deleteUser(mockRequest, mockResponse);

    const {
      statusCode,
      data: { message },
    } = mockResponse;
    expect(statusCode).toBe(422);
    expect(message).toBe("User delete failed");
  });

  it("should successfully handle error on unexpected error", async () => {
    adapters.deleteAuthUser = jest.fn(() => {
      throw new Error("Something unexpected");
    });
    mockingoose(usersModel).toReturn({ externalId: "aaa-bbb-ccc" }, "findOne");

    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        id: "abc-123",
      },
    };
    await deleteUser(mockRequest, mockResponse);

    const {
      statusCode,
      data: { message },
    } = mockResponse;
    expect(statusCode).toBe(422);
    expect(message).toBe("Something unexpected");
  });

  it("should successfully deactivate user", async () => {
    usersModel.findOne = jest.fn(() => {
      return {};
    });
    usersModel.updateOne = jest.fn(() => {
      return { updatedCount: 1 };
    });

    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        id: "abc-123",
      },
    };
    await deactivateUser(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(usersModel.findOne).toBeCalledWith({ _id: "abc-123" });
    expect(usersModel.updateOne).toBeCalledWith(
      { _id: "abc-123" },
      { $set: { active: false } }
    );
    expect(statusCode).toBe(200);
    expect(data).toStrictEqual({ ok: true });
  });

  it("should return error - user not found", async () => {
    usersModel.findOne = jest.fn(() => {
      return null;
    });

    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        id: "abc-123",
      },
    };
    await deactivateUser(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(usersModel.findOne).toBeCalledWith({ _id: "abc-123" });
    expect(statusCode).toBe(404);
    expect(data).toStrictEqual({
      code: 404,
      message: "User not found",
    });
  });

  it("should return error - user deactivation failed", async () => {
    usersModel.findOne = jest.fn(() => {
      return {};
    });
    usersModel.updateOne = jest.fn(() => {
      return { updatedCount: 0 };
    });

    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        id: "abc-123",
      },
    };
    await deactivateUser(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(usersModel.findOne).toBeCalledWith({ _id: "abc-123" });
    expect(usersModel.updateOne).toBeCalledWith(
      { _id: "abc-123" },
      { $set: { active: false } }
    );
    expect(statusCode).toBe(422);
    expect(data).toStrictEqual({
      code: 422,
      message: "User deactivation failed",
    });
  });

  it("should return error - database error", async () => {
    usersModel.findOne = jest.fn(() => {
      throw new DatabaseError();
    });

    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        id: "abc-123",
      },
    };
    await deactivateUser(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(usersModel.findOne).toBeCalledWith({ _id: "abc-123" });
    expect(statusCode).toBe(422);
    expect(data).toStrictEqual({
      code: 422,
      message: "database error",
    });
  });
});

class DatabaseError extends Error {
  constructor() {
    super("database error");
    this.code = 422;
  }
}
