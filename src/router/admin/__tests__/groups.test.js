import router from "../groups";

describe("Admin - Groups Router", () => {
  const routes = [
    { path: "/", method: "get" },
    { path: "/:group", method: "get" },
    { path: "/", method: "post" },
    { path: "/:group", method: "delete" },

    { path: "/:group/toggle-active", method: "patch" },
  ];

  it.each(routes)("'$method' exists on $path", ({ method, path }) => {
    const { stack } = router;
    expect(
      stack.some((s) => Object.keys(s.route.methods).includes(method))
    ).toBe(true);
    expect(stack.some((s) => s.route.path === path)).toBe(true);
  });
});
