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
      deployedOrganisation: "deployedOrganisation",
      temporaryPassword: "abcdef",
    });

    expect(res).toBe("uuid");
  });
});
