import { isValidPayload, sendNotFound } from "../utils";
import TestResponse from "../../../testUtils";

describe("Groups - UTILS", () => {
  it("should check if valid", () => {
    const isValid = isValidPayload({
      label: "test",
      description: "test group",
    });
    expect(isValid).toBe(true);
  });

  it("should be not valid", () => {
    const isValid = isValidPayload({ description: "test group" });
    expect(isValid).toBe(false);
  });

  it("should be not valid", () => {
    const isValid = isValidPayload();
    expect(isValid).toBe(false);
  });

  it("send not found", () => {
    const mockResponse = new TestResponse();
    sendNotFound(mockResponse);

    const { statusCode, data } = mockResponse;
    expect(statusCode).toBe(404);
    expect(data).toStrictEqual({
      code: 404,
      detail: undefined,
      message: "Group(s) not found",
    });
  });
});
