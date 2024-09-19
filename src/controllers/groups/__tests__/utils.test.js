import { isValidPayload, sendNotFound, isGroupNameValid } from "../utils";
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

  it("should validate group names", () => {
    expect(isGroupNameValid("Example_Word-123")).toBe(true);
    expect(isGroupNameValid("__valid_underscores__")).toBe(true);
    expect(isGroupNameValid("Valid-middle+7:options.work_ok")).toBe(true);
    expect(isGroupNameValid("Valid---words")).toBe(true);
    expect(isGroupNameValid("123InvalidStart")).toBe(false);
    expect(isGroupNameValid("Invalid*Char")).toBe(false);
    expect(isGroupNameValid("invalid?middle")).toBe(false);
    expect(isGroupNameValid("cannot_end_with.")).toBe(false);
    expect(isGroupNameValid("cannot_end-with-")).toBe(false);
    expect(isGroupNameValid("cannot_end_with+")).toBe(false);
    expect(isGroupNameValid("cannot_end_with:")).toBe(false);
  })
});
