import React from "react";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import axios from "axios";

import Update from "./Update";
import { LookupContext } from "../../../context/LookupContext";
import { access } from "../../../setupTests";
import {
  countries,
  exampleAttrs,
  exampleGroups,
  exampleHierarchy,
  exampleLabels,
  exampleUser,
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
const mockID = "admin@telicent.io";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useParams: () => ({ id: mockID }),
  };
});

describe("Update component", () => {
  beforeEach(() => {
    axios.get = jest.fn((url) => {
      if (url === `${access}/groups`) {
        return { data: exampleGroups };
      }
      if (url === `${access}/attributes`) {
        return { data: exampleAttrs };
      }
      if (url === `${access}/scim/v2/IsEnabled`) {
        return { data: { isEnabled: false } };
      }
      if (
        url === `${access}/hierarchies/lookup/clearance?isUserAttribute=true`
      ) {
        return { data: exampleHierarchy };
      }
      if (url === `${access}/countries`) {
        return {
          data: exampleLabels.find((label) => label.name === "nationality")
            .value.values,
        };
      }

      return { data: exampleUser };
    });
  });

  test("renders component correctly based on url param", async () => {
    await renderWithBrowserRouter(withLookupProvider(<Update />));
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "name *" })).toHaveValue(
        "Admin User"
      );
    });
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "email *" })).toHaveValue(
        mockID
      );
    });
    await waitFor(() => {
      expect(screen.getByTestId("org-test-id")).toHaveValue("Telicent");
    });
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /cancel/i })
      ).toBeInTheDocument();
    });
  });

  test("returns to Users when click cancel", async () => {
    const { user } = renderWithBrowserRouter(withLookupProvider(<Update />));

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));
    await waitFor(() => {
      user.click(screen.getByRole("button", { name: /cancel/i }));
      expect(window.location.pathname).toBe("/users");
    });
  });

  test("warns user if the form field is left empty on submit update", async () => {
    const { user } = renderWithBrowserRouter(withLookupProvider(<Update />));

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "name *" })).toHaveValue(
        "Admin User"
      );
    });

    await user.clear(screen.getByRole("textbox", { name: "name *" }));
    await user.click(screen.getByRole("button", { name: "Update" }));
    expect(screen.getByText(/please enter a valid name/i)).toBeInTheDocument();
  });
});
