import router from "../hierarchies";

describe("System - Hierarchies Router", () => {


  const routes = [
    { path: "/lookup/:name", method: "get" },
  ];

  it.each(routes)("'$method' exists on $path", ({ path, method }) => {
    const { stack } = router;
    
    expect(
        stack.some((s) => Object.keys(s.route.methods).includes(method))
      ).toBe(true);
    expect(stack.some((s) => s.route.path === path)).toBe(true);
  });
});
