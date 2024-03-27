import scim from "../scim";

describe("SCIM Router", () => {
  const routes = [
    { path: "/v2/ping", method: "get" },
    { path: "/v2/Users", method: "get" },
    { path: "/v2/Users/:userId", method: "get" },
    { path: "/v2/Users", method: "post" },
    { path: "/v2/Users/:userId", method: "delete" },
  ];

  it.each(routes)("'$method' exists on $path", ({ method, path }) => {
    const { stack } = scim;
    expect(
      stack.some((s) => Object.keys(s.route.methods).includes(method))
    ).toBe(true);
    expect(stack.some((s) => s.route.path === path)).toBe(true);
  });
});
