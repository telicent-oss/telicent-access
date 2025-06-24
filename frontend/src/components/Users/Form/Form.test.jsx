import React from "react";
import api from "../../../utils/api";
import axios from "axios";
import { screen } from "@testing-library/react";

import Form from "./Form";
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

describe.skip("Form component", () => {
  const labels = getLabels(exampleUser);

  beforeEach(() => {
    api.get = jest.fn((url) => {
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
          data: labels.find(({ name }) => name === "nationality").value.values,
        };
      }
      return {};
    });
  });

  test("fills fields and selects values with user data", async () => {
    const { name, email } = exampleUser;
    const { deployed_organisation, nationality, clearance, personnel_type } =
      labels;

    renderWithBrowserRouter(
      <LookupContext.Provider
        value={{
          countries: { data: countries },
          clearances: { data: exampleHierarchy },
          isScimEnabled: { data: false },
        }}
      >
        <Form
          basis={{
            name,
            email,
            deployed_organisation,
            nationality,
            clearance,
            personnel_type,
          }}
        />
      </LookupContext.Provider>
    );

    expect(await screen.findByRole("textbox", { name: "name *" })).toHaveValue(
      name
    );
    expect(await screen.findByRole("textbox", { name: "email *" })).toHaveValue(
      email
    );
    expect(await screen.findByTestId("org-test-id")).toHaveValue(
      deployed_organisation
    );
    expect(await screen.findByTestId("nationality-test-id")).toHaveValue(
      nationality
    );
    expect(await screen.findByTestId("clearance-test-id")).toHaveValue(
      clearance
    );
    expect(await screen.findByTestId("personnel-type-test-id")).toHaveValue(
      personnel_type
    );
  });
});
