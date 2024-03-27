import usersModel from "../../../database/models/Users";
import TestResponse, { stringifyMongoId } from "../../../testUtils";
import { getAll, getUserAttributes } from "../read";

const mockingoose = require("mockingoose");
const externalId = "8bb01245-261e-4609-a4a5-xxxxxxxxxxxx";

const mockUsers = [
  {
    _id: "64dd02xxxxxxxxxxxcecbe13c",
    id: "64dd02xxxxxxxxxxxcecbe13c",
    externalId,
    name: "Thomas",
    userName: "headofeng@telicent.io",
    email: "headofeng@telicent.io",
    labels: [
      {
        name: "nationality",
        value: "GBR",
        toString: "nationality='GBR'",
        toDataLabelString: "permittedNationalities='GBR'",
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
        name: "personnelType",
        value: "NON-GOV",
        toString: "personnelType='NON-GOV'",
        toDataLabelString: null,
        _id: "64dd1faaaaaaaaaaaaa0e9d0",
      },
      {
        name: "deployedOrganisation",
        value: "Telicent",
        toString: "deployedOrganisation='Telicent'",
        toDataLabelString: "permittedOrganisations='Telicent'",
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
];
const expectedResponse = {
  schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  totalResults: 1,
  startIndex: 1,
  itemsPerPage: 1,
  Resources: [
    {
      id: "64dd02xxxxxxxxxxxcecbe13c",
      externalId: "8bb01245-261e-4609-a4a5-xxxxxxxxxxxx",
      userName: "headofeng@telicent.io",
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      groups: [],
    },
  ],
};
describe("SCIM User - Get", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should get all users", async () => {
    const mockRequest = { query: {} };
    const mockResponse = new TestResponse();

    mockingoose(usersModel).toReturn(mockUsers, "find");
    await getAll(true)(mockRequest, mockResponse);

    let {
      statusCode,
      data,
      data: { Resources },
    } = mockResponse;
    expect(statusCode).toBe(200);
    data.Resources = Resources.map(stringifyMongoId);
    expect(data).toEqual(expectedResponse);
  });

  it("should return error when there is an unexpected failure", async () => {
    const mockResponse = new TestResponse();
    const mockRequest = { query: {} };

    mockingoose(usersModel).toReturn(new Error("Error"), "find");
    await getAll(true)(mockRequest, mockResponse);

    const {
      statusCode,
      data: { detail },
    } = mockResponse;
    expect(statusCode).toBe(422);
    expect(detail).toBe("Error");
  });

  it("should return user not found error if there are no matches", async () => {
    const mockResponse = new TestResponse();
    const mockRequest = { query: { filter: 'userName eq "nonexistent"' } };

    mockingoose(usersModel).toReturn([], "find");
    await getAll(true)(mockRequest, mockResponse);

    const {
      statusCode,
      data: { totalResults, Resources },
    } = mockResponse;
    expect(statusCode).toBe(200);
    expect(totalResults).toBe(0);
    expect(Resources.length).toBe(0);
  });

  it("should return specified user", async () => {
    const mockResponse = new TestResponse();
    const mockRequest = { query: { filter: 'userName eq "headofeng@telicent.io"' } };

    mockingoose(usersModel).toReturn([mockUsers[0]], "find");
    await getAll(true)(mockRequest, mockResponse);

    const {
      statusCode,
      data: { totalResults, Resources },
    } = mockResponse;
    expect(statusCode).toBe(200);
    expect(totalResults).toBe(1);
    expect(Resources[0].userName).toBe("headofeng@telicent.io");
  });

  it("should successfully get user attributes", async () => {
    mockingoose(usersModel).toReturn(mockUsers[0], "findOne");
    const mockResponse = new TestResponse();
    const mockRequest = { params: { userId: externalId } };

    await getUserAttributes(true)(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(200);
    expect(stringifyMongoId(data)).toEqual(expectedResponse.Resources[0]);
  });

  it("should return error when there is a unexpected failure getting attributes", async () => {
    const mockResponse = new TestResponse();
    const mockRequest = { params: { userId: externalId } };

    mockingoose(usersModel).toReturn(new Error("Error"), "findOne");
    await getUserAttributes(true)(mockRequest, mockResponse);

    const {
      statusCode,
      data: { detail },
    } = mockResponse;
    expect(statusCode).toBe(422);
    expect(detail).toBe("Error");
  });

  it("should return user not found error if there are no matches getting attributes", async () => {
    const mockResponse = new TestResponse();
    const mockRequest = { params: { userId: "nonexistent" } };

    mockingoose(usersModel).toReturn(undefined, "findOne");
    await getUserAttributes(true)(mockRequest, mockResponse);

    const {
      statusCode,
      data: { detail },
    } = mockResponse;
    expect(statusCode).toBe(404);
    expect(detail).toBe("User not found");
  });
});
