import groupsModel from "../../../database/models/Groups";
import TestResponse from "../../../testUtils";
import { getAll, getGroup } from "../read";

const MOCK_GROUPS = [
  {
    _id: "64d27846c248737ae094c4ea",
    label: "manager",
    groupId: "urn:telicent:groups:manager",
    description: "Group for all managers",
    active: false,
    userCount: 0,
    users: [],
    __v: 0,
  },
  {
    _id: "64d27aae0e121de092c20621",
    label: "developers",
    groupId: "urn:telicent:groups:developers",
    description: "Group for all developers",
    active: true,
    userCount: 1,
    users: [
      {
        _id: "652975d718b769cf733c6154",
        id: "652975d718b769cf733c6154",
        name: "headofeng@telicent.io",
        active: true,
      },
    ],
    __v: 0,
  },
];

const expectedGroups = MOCK_GROUPS.map((group) => {
  delete group.__v;
  delete group.users;
  return group;
});

describe("Groups - READ", () => {
  it("should GET all groups", async () => {
    groupsModel.aggregate = jest.fn((query) => {
      const groups = MOCK_GROUPS.map((group) => {
        const isInclusive = Object.values(query[3]["$project"]).some(
          (val) => val === 1
        );
        const grp = isInclusive ? {} : group;
        Object.entries(query[3]["$project"]).forEach(([k, v]) => {
          if (isInclusive) {
            if (v) {
              grp[k] = group[k];
            }
          } else {
            if (!v) {
              delete grp[k];
            }
          }
        });
        return grp;
      });

      return groups;
    });
    const mockRequest = { query: {} };
    const mockResponse = new TestResponse();
    await getAll(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(200);
    expect(data).toStrictEqual(expectedGroups);
  });

  it("should GET all groups - empty", async () => {
    groupsModel.aggregate = jest.fn(() => {
      return [];
    });
    const mockRequest = { query: {} };
    const mockResponse = new TestResponse();
    await getAll(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(200);
    expect(data).toStrictEqual([]);
  });

  it("should GET all groups - not found", async () => {
    groupsModel.aggregate = jest.fn(() => {
      return null;
    });
    const mockRequest = { query: {} };
    const mockResponse = new TestResponse();
    await getAll(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(404);
    expect(data).toStrictEqual({
      code: 404,
      message: "Group(s) not found",
    });
  });

  it("should GET all groups - database error", async () => {
    groupsModel.aggregate = jest.fn(() => {
      throw new DatabaseError();
    });
    const mockRequest = { query: {} };
    const mockResponse = new TestResponse();
    await getAll(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(422);
    expect(data).toStrictEqual({
      code: 422,
      message: "database error",
    });
  });

  //----------Group----------//

  it("should GET group", async () => {
    groupsModel.aggregate = jest.fn((query) => {
      return MOCK_GROUPS.filter(
        (group) => group.groupId === query[0]["$match"].groupId
      ).map((group) => ({ ...group, userCount: 0 }));
    });
    const testId = "urn:telicent:groups:manager";
    const mockRequest = {
      params: {
        groupId: testId,
      },
    };
    const mockResponse = new TestResponse();
    await getGroup(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(200);
    expect(data).toStrictEqual(
      expectedGroups.find((group) => group.groupId === testId)
    );
  });

  it("should GET group - not found", async () => {
    groupsModel.aggregate = jest.fn(() => {
      return null;
    });
    const testId = "urn:telicent:groups:manager";
    const mockRequest = {
      params: {
        groupId: testId,
      },
    };
    const mockResponse = new TestResponse();
    await getGroup(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(404);
    expect(data).toStrictEqual({
      code: 404,
      message: "Group(s) not found",
    });
  });

  it("should GET group - database error", async () => {
    groupsModel.aggregate = jest.fn(() => {
      throw new DatabaseError();
    });
    const testId = "urn:telicent:groups:manager";
    const mockRequest = {
      params: {
        groupId: testId,
      },
    };
    const mockResponse = new TestResponse();
    await getGroup(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
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
