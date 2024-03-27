import {
  createHeadersWithToken,
  retrieveAdminToken,
  setFilterArgument,
} from "../utils";
import { server } from "../../../mocks";

describe("Keycloak utils", () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it("should use default token if token is not set", () => {
    const res = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer changeme`,
      },
    };
    expect(createHeadersWithToken()).toEqual(res);
  });

  it("should insert token into header", () => {
    const res = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer token`,
      },
    };
    expect(createHeadersWithToken("token")).toEqual(res);
  });

  it("should filter array by user id", () => {
    const mongoUsers = [{ externalId: 1 }];
    const authUsers = [{ id: 1 }, { id: 2 }];
    const showUsersThatDontExist = setFilterArgument(mongoUsers);

    expect(authUsers.filter(showUsersThatDontExist)).toEqual([authUsers[1]]);
  });

  it("should call openid token endpoint with secret", async () => {
    expect(await retrieveAdminToken()).toBe("token");
  });
});
