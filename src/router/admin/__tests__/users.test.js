import router from "../users";

describe("Admin - Users Router", () => {
  const routes = [
    { path: "/", method: "get" },
    { path: "/:id", method: "get" },
    { path: "/:id", method: "patch" },
  ];

  it.each(routes)("'$method' exists on $path", ({ method, path }) => {
    const { stack } = router;
    expect(
      stack.some((s) => Object.keys(s.route.methods).includes(method))
    ).toBe(true);
    expect(stack.some((s) => s.route.path === path)).toBe(true);
  });
});