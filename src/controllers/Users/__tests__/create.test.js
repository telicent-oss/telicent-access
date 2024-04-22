import { Types } from "mongoose";
import { ObjectId } from 'bson';

import { createUser } from "../create";
import * as deleteUser from "../delete";
import * as adapters from "../../../adapters";
import usersModel from "../../../database/models/Users";
import { server } from "../../../mocks";
import TestResponse from "../../../testUtils";

const mockingoose = require("mockingoose");

const frontendInput = {
  name: "name",
  clearance: "O",
  email: "email",
  deployedOrganisation: "Telicent",
  nationality: "GBR",
  type: "NON-GOV",
  userGroups: [],
  personnelType: "NON-GOV",
  active: true,
};

describe("User - CREATE", () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    mockingoose.resetAll();
  });
  afterAll(() => {
    server.close();
  });

  it("should successfully create a user", async () => {
    const id = "507f191e810c19729de860ea";
    mockingoose(usersModel).toReturn({}, "save").toReturn(null, "validateSync");
    Types.ObjectId = jest.fn(() => new ObjectId(id));
    adapters.createAuthUser = jest.fn(() => "abc-123");

    const mockRequest = {
      body: frontendInput,
    };
    const mockResponse = new TestResponse();
    await createUser(false)(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(adapters.createAuthUser).toHaveBeenCalledTimes(1);
    expect(statusCode).toBe(201);
    expect(data).toEqual({
      id: new ObjectId(id), // ID obtained from mock handler response.
    });
    mockingoose(usersModel).reset();
  });

  it("should return error if validation failed", async () => {
    const missingInput = Object.assign({}, frontendInput);
    delete missingInput.nationality;
    const mockRequest = {
      body: missingInput,
    };
    const mockResponse = new TestResponse();
    await createUser(false)(mockRequest, mockResponse);

    const {
      statusCode,
      data: { message },
    } = mockResponse;
    expect(statusCode).toBe(422);
    expect(message).toBe(
      "User validation failed: nationality is required and was missing"
    );
  });

  it("should return error if the auth system fails to create user", async () => {
    const mockRequest = {
      body: frontendInput,
    };
    adapters.createAuthUser = jest.fn(() => {
      throw new ConflictUserError();
    });
    const mockResponse = new TestResponse();
    await createUser(false)(mockRequest, mockResponse);

    const {
      statusCode,
      data: { message },
    } = mockResponse;
    expect(statusCode).toBe(409);
    expect(message).toBe("User already exists in IdP");
  });

  it("should return error and delete user if validation fails", async () => {
    const mockRequest = {
      body: frontendInput,
    };
    mockingoose(usersModel).reset();
    mockingoose(usersModel).toReturn({}, "save");
    usersModel.prototype.validateSync = jest.fn(() => ({ message: "uh-oh" }));
    adapters.createAuthUser = jest.fn(() => "abc-123");
    deleteUser.deleteUserById = jest.fn(() => true);

    const mockResponse = new TestResponse();
    await createUser(false)(mockRequest, mockResponse);

    const {
      statusCode,
      data: { message },
    } = mockResponse;
    expect(adapters.createAuthUser).toHaveBeenCalledTimes(1);
    expect(deleteUser.deleteUserById).toHaveBeenCalledTimes(1);
    expect(deleteUser.deleteUserById).toBeCalledWith("abc-123", true);
    expect(statusCode).toBe(422);
    expect(message).toBe("uh-oh");
  });
});

class ConflictUserError extends Error {
  constructor() {
    super("user already exists");
    this.code = "UsernameExistsException";
    this.statusCode = 409;
  }
}
