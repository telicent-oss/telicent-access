import {
  getAll,
  getAllUsers,
  getUserAttributes,
  getUserFromEmail,
} from "../read";
import usersModel from "../../../database/models/Users";
import TestResponse, { stringifyMongoId } from "../../../testUtils";

const mockingoose = require("mockingoose");

const mockUsers = [
  {
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
        _id: "66042eba7b888050ea0a1476",
      },
      {
        name: "clearance",
        value: "O",
        toString: "clearance='O'",
        toDataLabelString: "classification='O'",
        _id: "66042f2abd3f44e4107d22b9",
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
    userGroups: [
      "urn:telicent:groups:developers",
      "urn:telicent:groups:csuite",
    ],
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
  },
  {
    _id: "64ddcccccccccccccccbe13b",
    id: "64ddcccccccccccccccbe13b",
    externalId: "138c92a8-cbc8-4a4c-822c-zzzzzzzzzzzz",
    name: "coo@telicent.io",
    userName: "coo@telicent.io",
    email: "coo@telicent.io",
    labels: [],
    active: false,
    groups: [],
    userGroups: [],
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    __v: 0,
  },
];

describe("Users - GET", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should get all users", async () => {
    mockingoose(usersModel).toReturn(mockUsers, "find");

    const { data } = await getAllUsers();
    const users = data.map(stringifyMongoId);
    expect(users).toMatchObject(mockUsers);
  });

  it("should get all users (api call)", async () => {
    mockingoose(usersModel).toReturn(mockUsers, "find");
    const mockResponse = new TestResponse();
    const mockRequest = {};
    await getAll(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(200);
    expect(data.map(stringifyMongoId)).toEqual(mockUsers);
  });

  it("should return error when there is an unexpected failure", async () => {
    mockingoose(usersModel).toReturn(new Error("uhoh"), "find");
    const mockResponse = new TestResponse();
    const mockRequest = {};

    await getAll(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toBe(422);
  });

  it("should successfully get user", async () => {
    mockingoose(usersModel).toReturn(mockUsers[0], "findOne");
    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        id: "64dd02xxxxxxxxxxxcecbe13c",
      },
    };
    await getUserAttributes(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(200);
    expect(stringifyMongoId(data)).toEqual(mockUsers[0]);
  });

  it("should successfully get user attributes by name", async () => {
    const expected = {
      attributes: [
        "permitted_nationalities='GBR'",
        "classification='O'",
        "permitted_organisations='Telicent'",
        "urn:telicent:groups:developers:and",
        "urn:telicent:groups:csuite:and",
        "urn:telicent:groups:developers:or",
        "urn:telicent:groups:csuite:or",
      ],
      id: "64dd02xxxxxxxxxxxcecbe13c",
    };
    mockingoose(usersModel).toReturn(mockUsers[0], "findOne");
    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        email: "headofeng@telicent.io",
      },
    };
    await getUserFromEmail(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(200);
    expect(stringifyMongoId(data)).toEqual(expected);
  });

  it("should return error when there is a unexpected error on find", async () => {
    mockingoose(usersModel).toReturn(new Error("uhoh"), "findOne");
    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        email: "headofeng@telicent.io",
      },
    };

    await getUserFromEmail(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toBe(422);
  });

  it("should return user not found error if there are 0 matches", async () => {
    mockingoose(usersModel).toReturn(undefined, "findOne");
    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        email: "doesntexist@fake.com",
      },
    };

    await getUserFromEmail(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toBe(404);
  });

  it("should return error when there is a unexpected failure", async () => {
    mockingoose(usersModel).toReturn(new Error("uhoh"), "findOne");
    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        id: "bbbb9783-c24c-494d-9543-f60fc9f2407f",
      },
    };

    await getUserAttributes(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toBe(422);
  });

  it("should return user not found error if there are no matches", async () => {
    mockingoose(usersModel).toReturn(undefined, "findOne");
    const mockResponse = new TestResponse();
    const mockRequest = {
      params: {
        id: "doesntexist",
      },
    };

    await getUserAttributes(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toBe(404);
  });
});
