import React from "react";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import axios from "axios";

import App from "./App";
import { LookupContext } from "./context/LookupContext";
import { access } from "./setupTests";
import {
  renderWithBrowserRouter,
  countries,
  exampleHierarchy,
  exampleGroups,
  exampleAttrs,
  exampleUsers,
} from "./testUtils";

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

describe("App component", () => {
  const { location } = window;

  beforeEach(() => {
    axios.get = jest.fn((url) => {
      if (url === `${access}/groups`) {
        return { data: exampleGroups };
      }
      if (url === `${access}/attributes`) {
        return { data: exampleAttrs };
      }
      if (url === `${access}/users`) {
        return { data: exampleUsers };
      }
      throw Error("Never goes here.");
    });
  });

  test("navigate to Users on sidebar click", async () => {
    renderWithBrowserRouter(withLookupProvider(<App />));

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));
    await waitFor(() => {
      expect(location.pathname).toBe("/users");
    });
  });

  
});
