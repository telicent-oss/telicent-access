import groupsModel from "../../../database/models/Groups";
import TestResponse from "../../../testUtils";
import { deleteGroup } from "../delete";
import mongoose from "mongoose";
describe("Groups - DELETE", () => {
  it("should delete group", async () => {
    groupsModel.findOne = jest.fn(() => {
      return { active: false };
    });
    groupsModel.deleteOne = jest.fn(() => {
      return {};
    });
    const testId = "64f749485fce985092884376";
    const mockRequest = {
      params: { group: testId },
    };
    const mockResponse = new TestResponse();
    await deleteGroup(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(groupsModel.deleteOne).toBeCalledWith({
      _id: mongoose.Types.ObjectId.createFromHexString(testId),
    });
    expect(statusCode).toBe(200);
    expect(data).toStrictEqual({
      deleted: true,
    });
  });

  it("should delete group throw error - database error", async () => {
    groupsModel.findOne = jest.fn(() => {
      return {};
    });
    groupsModel.deleteOne = jest.fn(() => {
      throw new BasicDatabaseError();
    });
    const testId = "64f749485fce985092884376";
    const mockRequest = {
      params: { group: testId },
    };
    const mockResponse = new TestResponse();
    await deleteGroup(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(422);
    expect(data).toStrictEqual({
      code: 422,
      message: "database error",
      detail: undefined,
    });
  });

  it("should delete group error - database error", async () => {
    groupsModel.findOne = jest.fn(() => {
      return {};
    });
    groupsModel.deleteOne = jest.fn(() => {
      return { err: new BasicDatabaseError() };
    });
    const testId = "64f749485fce985092884376";
    const mockRequest = {
      params: { group: testId },
    };
    const mockResponse = new TestResponse();
    await deleteGroup(mockRequest, mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(422);
    expect(data).toStrictEqual({
      code: 422,
      message: "database error",
      detail: undefined,
    });
  });
});

class BasicDatabaseError extends Error {
  constructor() {
    super("database error");
    this.code = 422;
  }
}
