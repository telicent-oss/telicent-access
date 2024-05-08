import groupsModel from "../../../database/models/Groups";
import TestResponse from "../../../testUtils";
import { deleteGroup } from "../delete";

describe("Groups - DELETE", () => {
  it("should delete group", async () => {
    groupsModel.findOne = jest.fn(() => {
      return {};
    });
    groupsModel.updateOne = jest.fn(() => {
      return {};
    });
    const testId = "urn:telicent:groups:developers";
    const mockRequest = {
      params: { group_id: testId },
    };
    const mockResponse = new TestResponse();
    await deleteGroup(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(groupsModel.updateOne).toBeCalledWith(
      { group_id: { $eq: testId } },
      { active: false }
    );
    expect(statusCode).toBe(200);
    expect(data).toStrictEqual({
      data: {
        deleted: true,
      },
    });
  });

  it("should delete group throw error - database error", async () => {
    groupsModel.findOne = jest.fn(() => {
      return {};
    });
    groupsModel.updateOne = jest.fn(() => {
      throw new BasicDatabaseError();
    });
    const testId = "urn:telicent:groups:developers";
    const mockRequest = {
      params: { group_id: testId },
    };
    const mockResponse = new TestResponse();
    await deleteGroup(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(422);
    expect(data).toStrictEqual({
      code: 422,
      message: "database error",
    });
  });

  it("should delete group error - database error", async () => {
    groupsModel.findOne = jest.fn(() => {
      return {};
    });
    groupsModel.updateOne = jest.fn(() => {
      return { err: new BasicDatabaseError() };
    });
    const testId = "urn:telicent:groups:developers";
    const mockRequest = {
      params: { group_id: testId },
    };
    const mockResponse = new TestResponse();
    await deleteGroup(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(422);
    expect(data).toStrictEqual({
      code: 422,
      message: "database error",
    });
  });
});

class BasicDatabaseError extends Error {
  constructor() {
    super("database error");
    this.code = 422;
  }
}
