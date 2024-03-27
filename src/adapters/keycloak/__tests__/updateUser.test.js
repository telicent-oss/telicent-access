import updateUser from "../updateUser";
import { server } from "../../../mocks";

describe("Update User", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("should update user successfully", async () => {
    const { status } = await updateUser({ uuid: "id", payload: {} });
    expect(status).toBe(200);
  });
});
