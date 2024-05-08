import React from "react";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import axios from "axios";

import Create, { FormState } from "./Create";
import { LookupContext } from "../../../context/LookupContext";
import { access } from "../../../setupTests";
import {
  countries,
  exampleAttrs,
  exampleGroups,
  exampleHierarchy,
  exampleUser,
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

describe("Create component", () => {
  const { name, email } = exampleUser;
  const labels = getLabels(exampleUser);
  const { nationality, deployed_organisation, personnel_type, clearance } =
    labels;

  beforeEach(() => {
    axios.get = jest.fn((url) => {
      if (url === `${access}/groups`) {
        return { data: exampleGroups };
      }
      if (url === `${access}/attributes`) {
        return { data: exampleAttrs };
      }
      return {};
    });
  });

  test("renders cancel button in create form", async () => {
    renderWithBrowserRouter(withLookupProvider(<Create />));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Cancel" })
      ).toBeInTheDocument();
    });
  });

  test("renders create button in create form", async () => {
    renderWithBrowserRouter(withLookupProvider(<Create />));

    await waitFor(() => {
      expect(screen.getByTestId("Create-button")).toBeInTheDocument();
    });
  });

  test("renders cancel button in update form", async () => {
    renderWithBrowserRouter(withLookupProvider(<FormState update />));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Cancel" })
      ).toBeInTheDocument();
    });
  });

  test("renders update button in update form", async () => {
    renderWithBrowserRouter(withLookupProvider(<FormState update />));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Update" })
      ).toBeInTheDocument();
    });
  });

  test("warns user if name field is empty on submit", async () => {
    const { user } = renderWithBrowserRouter(withLookupProvider(<Create />));

    await waitFor(() => {
      user.type(screen.getByRole("textbox", { name: "email *" }), email);
      user.type(screen.getByTestId("org-test-id"), deployed_organisation);

      user.selectOptions(screen.getByTestId("clearance-test-id"), clearance);
      user.selectOptions(
        screen.getByTestId("nationality-test-id"),
        nationality
      );
      user.selectOptions(
        screen.getByTestId("personnel-type-test-id"),
        personnel_type
      );
      user.click(screen.getByRole("button", { name: "Create" }));

      expect(
        screen.getByText(/please enter a valid name/i)
      ).toBeInTheDocument();
    });
  });

  test("warns user if email field is empty on submit", async () => {
    const { user } = renderWithBrowserRouter(withLookupProvider(<Create />));

    await waitFor(() => {
      user.type(screen.getByRole("textbox", { name: "name *" }), name);
      user.type(screen.getByTestId("org-test-id"), deployed_organisation);
      user.selectOptions(screen.getByTestId("clearance-test-id"), clearance);
      user.selectOptions(
        screen.getByTestId("nationality-test-id"),
        nationality
      );
      user.selectOptions(
        screen.getByTestId("personnel-type-test-id"),
        personnel_type
      );
      user.click(screen.getByRole("button", { name: "Create" }));

      expect(
        screen.getByText(/please enter a valid email/i)
      ).toBeInTheDocument();
    });
  });

  test("warns user if organisation field is empty on submit", async () => {
    const { user } = renderWithBrowserRouter(withLookupProvider(<Create />));

    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));
    await waitFor(() => {
      user.type(screen.getByRole("textbox", { name: "name *" }), name);
      user.type(screen.getByRole("textbox", { name: "email *" }), email);
      user.selectOptions(screen.getByTestId("clearance-test-id"), clearance);
      user.selectOptions(
        screen.getByTestId("nationality-test-id"),
        nationality
      );
      user.selectOptions(
        screen.getByTestId("personnel-type-test-id"),
        personnel_type
      );
      user.click(screen.getByRole("button", { name: "Create" }));

      expect(
        screen.getByText(/please enter a valid deployed organisation/i)
      ).toBeInTheDocument();
    });
  });
});
