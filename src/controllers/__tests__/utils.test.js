import { isBodyEmpty, setupSuccessResponseAction } from "../utils";
import TestResponse from "../../testUtils";

describe("controller utils", () => {
  it("should return true if body is empty", () => {
    expect(isBodyEmpty({})).toBeTruthy();
    expect(isBodyEmpty()).toBeTruthy();
  });

  it("should return false if body is not empty", () => {
    expect(isBodyEmpty({ key: "value" })).toBeFalsy();
  });

  it("should send a success payload with the assigned object key", () => {
    const mockUpdatedResponse = new TestResponse();
    const mockCreatedResponse = new TestResponse();

    const updatedSuccessResponse = setupSuccessResponseAction("updated");
    const createdSuccessResponse = setupSuccessResponseAction("created");

    updatedSuccessResponse(mockUpdatedResponse);
    createdSuccessResponse(mockCreatedResponse);

    expect(mockUpdatedResponse.data).toEqual({ updated: true });
    expect(mockCreatedResponse.data).toEqual({ created: true });
  });
});
