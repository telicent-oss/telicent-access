import React from "react";
import { screen, waitFor } from "@testing-library/react";

import List from "./List";
import { LookupContext } from "../../../context/LookupContext";
import {
  countries,
  exampleHierarchy,
  exampleUsers,
  getLabels,
  renderWithBrowserRouter,
} from "../../../testUtils";

const withLookupProvider = (children) => (
  <LookupContext.Provider
    value={{
      countries: { data: countries },
      clearances: { data: exampleHierarchy },
      isScimEnabled: { data: false },
    }}
  >
    {children}
  </LookupContext.Provider>
);
const refetch = jest.fn();

describe("List component", () => {
  const egUser0 = exampleUsers[0];
  const { name: name0, email: email0 } = egUser0;
  const {
    nationality: nationality0,
    deployed_organisation: deployedOrganisation0,
    personnel_type: personnelType0,
    clearance: clearance0,
  } = getLabels(egUser0);
  const egUser1 = exampleUsers[1];
  const { name: name1 } = egUser1;
  const { nationality: nationality1, clearance: clearance1 } =
    getLabels(egUser1);

  test.skip("renders nationality, classification and sort selects", async () => {
    renderWithBrowserRouter(withLookupProvider(<List users={exampleUsers} />));

    expect(await screen.findByTestId("nationality")).toBeInTheDocument();
    expect(
      await screen.findByTestId("clearance")
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("combobox", { name: "Sort by" })
    ).toBeInTheDocument();
  });

  test("renders 2 list items", async () => {
    renderWithBrowserRouter(withLookupProvider(<List users={exampleUsers} />));

    expect(
      await screen.findAllByRole("listitem", { name: "list-item-user" })
    ).toHaveLength(2);
  });

  test("renders 2 delete user buttons", async () => {
    renderWithBrowserRouter(withLookupProvider(<List users={exampleUsers} />));

    expect(
      await screen.findAllByRole("button", { name: "Delete user" })
    ).toHaveLength(2);
  });

  test("renders 2 edit user buttons", async () => {
    renderWithBrowserRouter(withLookupProvider(<List users={exampleUsers} />));

    expect(
      await screen.findAllByRole("button", { name: "Edit user" })
    ).toHaveLength(2);
  });

  test("list item contains correct user data", async () => {
    renderWithBrowserRouter(withLookupProvider(<List users={exampleUsers} />));

    expect(screen.getAllByLabelText("text-name")[0]).toHaveTextContent(name0);
    expect(screen.getAllByLabelText("text-email")[0]).toHaveTextContent(email0);
    expect(screen.getAllByLabelText("text-nationality")[0]).toHaveTextContent(
      nationality0
    );
    expect(screen.getAllByLabelText("text-organisation")[0]).toHaveTextContent(
      deployedOrganisation0
    );
    expect(
      screen.getAllByLabelText("text-personnel-type")[0]
    ).toHaveTextContent(personnelType0);
    expect(screen.getAllByLabelText("text-clearance")[0]).toHaveTextContent(
      clearance0
    );
  });

  test.skip("nationality dropdown filters correctly", async () => {
    const { user } = renderWithBrowserRouter(
      withLookupProvider(<List users={exampleUsers} />)
    );
    expect(screen.getAllByRole("button", { name: "Edit user" })).toHaveLength(
      2
    );

    await user.selectOptions(screen.getByTestId("nationality"), [
      nationality1,
    ]);
    await user.selectOptions(screen.getByTestId("nationality"), [
      nationality1,
    ]);
    expect(screen.getByText(name1)).toBeInTheDocument();
    expect(screen.queryByRole(name0)).not.toBeInTheDocument();
  });

  test.skip("classification dropdown filters correctly", async () => {
    const { user } = renderWithBrowserRouter(
      withLookupProvider(<List users={exampleUsers} />)
    );
    expect(screen.getAllByRole("button", { name: "Edit user" })).toHaveLength(
      2
    );

    await user.selectOptions(screen.getByTestId("clearance"), [
      clearance1,
    ]);
    expect(screen.getByText(name1)).toBeInTheDocument();
    expect(screen.queryByRole(name0)).not.toBeInTheDocument();
  });

  test.skip("sort dropdown sorts correctly", async () => {
    const { user } = renderWithBrowserRouter(
      withLookupProvider(<List users={exampleUsers} />)
    );

    expect(screen.getAllByRole("button", { name: "Edit user" })).toHaveLength(
      2
    );
    expect(screen.getAllByLabelText("text-clearance")[0]).toHaveTextContent(
      clearance0
    );
    expect(screen.getAllByLabelText("text-clearance")[1]).toHaveTextContent(
      clearance1
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Sort by" }),
      ["clearance"]
    );
    expect(screen.getAllByLabelText("text-clearance")[0]).toHaveTextContent(
      clearance1
    );
    expect(screen.getAllByLabelText("text-clearance")[1]).toHaveTextContent(
      clearance0
    );
  });

  test("sort reverse button functions correctly", async () => {
    const { user } = renderWithBrowserRouter(
      withLookupProvider(<List users={exampleUsers} />)
    );

    expect(screen.getAllByRole("button", { name: "Edit user" })).toHaveLength(
      2
    );
    expect(screen.getAllByLabelText("text-name")[0]).toHaveTextContent(name0);
    expect(screen.getAllByLabelText("text-name")[1]).toHaveTextContent(name1);

    await user.click(
      screen.getByRole("button", { name: "Reverse sort order" })
    );
    expect(screen.getAllByLabelText("text-name")[0]).toHaveTextContent(name1);
    expect(screen.getAllByLabelText("text-name")[1]).toHaveTextContent(name0);

    await user.click(
      screen.getByRole("button", { name: "Reverse sort order" })
    );
    expect(screen.getAllByLabelText("text-name")[0]).toHaveTextContent(name0);
    expect(screen.getAllByLabelText("text-name")[1]).toHaveTextContent(name1);
  });

  test("delete dialog appears on delete button click", async () => {
    const { user } = renderWithBrowserRouter(
      withLookupProvider(<List users={exampleUsers} />)
    );
    expect(screen.getByText("Admin User")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "Delete user" })[0]);
    expect(screen.getByText("Delete User?")).toBeInTheDocument();
  });

  test("delete dialog disappears on cancel delete", async () => {
    const { user } = renderWithBrowserRouter(
      withLookupProvider(<List users={exampleUsers} />)
    );
    expect(screen.getByText("Admin User")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "Delete user" })[0]);
    await user.click(screen.getByRole("button", { name: "Don't delete" }));
    expect(
      screen.queryByRole("heading", { name: "Delete User?" })
    ).not.toBeInTheDocument();
  });

  test("delete dialog disappears on delete", async () => {
    const { user } = renderWithBrowserRouter(
      withLookupProvider(<List users={exampleUsers} refetch={refetch} />)
    );

    await waitFor(() => {
      expect(screen.getByText("Admin User")).toBeInTheDocument();
    });
    await user.click(screen.getAllByRole("button", { name: "Delete user" })[0]);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: "Delete User?" })
      ).not.toBeInTheDocument();
    });
  });

  test("filter users based on search input text", async () => {
    const { user } = renderWithBrowserRouter(
      withLookupProvider(<List users={exampleUsers} refetch={refetch} />)
    );
    const adminUser = screen.getByText("Admin User");
    const testUser = screen.getByText("Test User");

    expect(adminUser).toBeInTheDocument();
    expect(testUser).toBeInTheDocument();

    await user.type(screen.getByTestId("search"), "admin@telicent.io");
    expect(adminUser).toBeInTheDocument();
    expect(testUser).not.toBeInTheDocument();
  });
});
