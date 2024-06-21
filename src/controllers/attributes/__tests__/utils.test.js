import { sendNotFound } from "../utils";
import TestResponse from "../../../testUtils";

describe("Attribute UTILS", () => {
  it("should test sendNotFound Util", () => {
    const res = new TestResponse();
    sendNotFound(res);
    const { statusCode, data } = res;
    expect(statusCode).toBe(404);
    expect(data).toStrictEqual({
      code: 404,
      message: "Attribute(s) not found",
      detail: undefined,
    });
  });
});
