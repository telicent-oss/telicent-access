import createUser from "../createUser";
import { server } from "../../../mocks";

describe("create user", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("should return the uuid of a created user", async () => {
    const res = await createUser({
      name: "name",
      email: "email",
      attributes: [],
      deployed_organisation: "deployed_organisation",
      temporary_password: "abcdef",
    });

    expect(res).toBe("uuid");
  });
});
