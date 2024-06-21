import router from "../attributes";

describe("Admin - Attributes Router", () => {
  const routes = [
    { path: "/", method: "get" },
    { path: "/:_id", method: "get" },
  ];

  it.each(routes)("'$method' exists on $path", ({ method, path }) => {
    const { stack } = router;
    expect(
      stack.some((s) => Object.keys(s.route.methods).includes(method))
    ).toBe(true);
    expect(stack.some((s) => s.route.path === path)).toBe(true);
  });
});
