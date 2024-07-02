import router from "../users";

describe("System - Users Router", () => {


  const routes = [
    { path: "/retrieve/:sub", method: "get" },
    { path: "/lookup/:email", method: "get" },
  ];

  it.each(routes)("'$method' exists on $path", ({ path, method }) => {
    const { stack } = router;
    
    expect(
        stack.some((s) => Object.keys(s.route.methods).includes(method))
      ).toBe(true);
    expect(stack.some((s) => s.route.path === path)).toBe(true);
  });
});
