import router from "../index";

describe("Users Router", () => {

  // const layers = [
  //   { name: "isUser", type: "function" },
  // ];

  const routes = [
    { path: "/whoami", method: "get" },
    { path: "/user-info/self", method: "get" },
  ];

  it("Correct number of paths exists on", () => {
    const { stack } = router;
    expect(
      stack.length
    ).toBe(2);
  });

  it.each(routes)("'$method' exists on $path", ({ path, method }) => {
    const { stack } = router;
    // filter out middleware 
    const configuredRoutes = stack.filter(layer => layer.name !== "isUser")
    expect(
        configuredRoutes.some((s) => Object.keys(s.route.methods).includes(method))
      ).toBe(true);
    expect(configuredRoutes.some((s) => s.route.path === path)).toBe(true);
  });
});
