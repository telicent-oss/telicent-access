import React from "react";
import { render } from "@testing-library/react";

import Topbar from "..";

describe("Topbar", () => {
  test("should render", () => {
    const action = <div>action</div>;
    const view = render(<Topbar header="header" action={action} />);

    expect(view).toMatchSnapshot();
  });
});
