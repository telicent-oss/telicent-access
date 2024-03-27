import deleteUser from "../deleteUser";
import { server } from "../../../mocks";

describe("Delete User", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("should successfully delete user from keycloak", async () => {
    const res = await deleteUser("id");
    expect(res.status).toBe(200);
  });
});
