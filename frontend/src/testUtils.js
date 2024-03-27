import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

export const renderWithBrowserRouter = (component) => ({
  user: userEvent.setup(),
  ...render(component, { wrapper: BrowserRouter }),
});

export const getLabels = (user) => {
  const labels = {};
  user.labels.forEach(({ name, value }) => {
    labels[name] = value;
  });
  return labels;
};

export const countries = [
  { name: "Japan", alpha2: "JP", alpha3: "JPN" },
  { name: "Sweden", alpha2: "SE", alpha3: "SWE" },
  { name: "United Kingdom", alpha2: "GB", alpha3: "GBR" },
];

export const exampleUsers = [
  {
    id: "64e3690cbcd5a5eb87b82836",
    externalId: "8bb01245-261e-4609-a4a5-xxxxxxxxxxxx",
    name: "Admin User",
    userName: "admin@telicent.io",
    email: "admin@telicent.io",
    labels: [
      {
        name: "nationality",
        value: "GBR",
        toString: 'nationality="GBR"',
        toDataLabelString: "permittedNationalities='GBR'",
        _id: "64e36950bcd5a5eb87b8284b",
      },
      {
        name: "clearance",
        value: "S",
        toString: 'clearance="S"',
        toDataLabelString: "classification='S'",
        _id: "64e36950bcd5a5eb87b8284c",
      },
      {
        name: "personnelType",
        value: "NON-GOV",
        toString: 'personnelType="NON-GOV"',
        toDataLabelString: null,
        _id: "64e36950bcd5a5eb87b8284d",
      },
      {
        name: "deployedOrganisation",
        value: "Telicent",
        toString: 'deployedOrganisation="Telicent"',
        toDataLabelString: "permittedOrganisations='Telicent'",
        _id: "64e36950bcd5a5eb87b8284e",
      },
    ],
    active: true,
    groups: [],
    userGroups: ["urn:telicent:groups:c-suite"],
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
  },
  {
    id: "64e3690cbcd5a5eb87b82835",
    externalId: "138c92a8-cbc8-4a4c-822c-zzzzzzzzzzzz",
    name: "Test User",
    userName: "test@telicent.io",
    email: "test@telicent.io",
    labels: [
      {
        name: "nationality",
        value: "GBR",
        toString: 'nationality="GBR"',
        toDataLabelString: "permittedNationalities='GBR'",
        _id: "64e36950bcd5a5eb87b8284b",
      },
      {
        name: "clearance",
        value: "O",
        toString: 'clearance="O"',
        toDataLabelString: "classification='O'",
        _id: "64e36950bcd5a5eb87b8284c",
      },
      {
        name: "personnelType",
        value: "NON-GOV",
        toString: 'personnelType="NON-GOV"',
        toDataLabelString: null,
        _id: "64e36950bcd5a5eb87b8284d",
      },
      {
        name: "deployedOrganisation",
        value: "Telicent",
        toString: 'deployedOrganisation="Telicent"',
        toDataLabelString: "permittedOrganisations='Telicent'",
        _id: "64e36950bcd5a5eb87b8284e",
      },
    ],
    active: true,
    groups: [],
    userGroups: ["urn:telicent:groups:c-suite"],
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
  },
];

export const exampleUser = exampleUsers[0];

export const exampleLabels = [
  {
    _id: "clearance-test-id",
    name: "clearance",
    usage: "both",
    value: {
      type: "hierarchy",
      values: ["O", "OS", "S", "TS"],
    },
    isIhm: true,
    readOnly: true,
    isUserRequired: true,
  },
  {
    _id: "nationality-test-id",
    name: "nationality",
    usage: "both",
    value: {
      type: "enum",
      values: countries.map(({ alpha3 }) => alpha3.trim()),
    },
    isIhm: true,
    readOnly: true,
    isUserRequired: true,
  },
  {
    _id: "org-test-id",
    name: "deployedOrganisation",
    usage: "both",
    value: {
      type: "string",
      values: null,
    },
    isIhm: true,
    readOnly: true,
    isUserRequired: true,
  },
  {
    _id: "personnel-type-test-id",
    name: "personnelType",
    usage: "both",
    value: {
      type: "enum",
      values: ["GOV", "NON-GOV"],
    },
    isIhm: true,
    readOnly: true,
    isUserRequired: true,
  },
];

export const exampleAttrs = [
  {
    value: { type: "hierarchy", values: ["O", "OS", "S", "TS"] },
    _id: "clearance-test-id",
    userAttributeName: "clearance",
    dataAttributeName: "classification",
    isIhm: true,
    readOnly: true,
  },
  {
    value: {
      type: "enum",
      values: ["AFG", "ALB", "DZA", "GBR"],
    },
    _id: "nationality-test-id",
    userAttributeName: "nationality",
    dataAttributeName: "permittedNationalities",
    isIhm: true,
    readOnly: true,
  },
  {
    value: { type: "string", values: null },
    _id: "org-test-id",
    userAttributeName: "deployedOrganisation",
    dataAttributeName: "permittedOrganisations",
    isIhm: true,
    readOnly: true,
  },
  {
    value: { type: "enum", values: ["GOV", "NON-GOV"] },
    _id: "personnel-type-test-id",
    userAttributeName: "personnelType",
    dataAttributeName: null,
    isIhm: true,
    readOnly: true,
  },
];

export const exampleGroups = [
  {
    _id: "64d2783ec248737ae094c4e8",
    label: "surgical",
    groupId: "urn:telicent:groups:surgical",
    description: "Group for all managers",
    active: true,
  },
  {
    _id: "64d27846c248737ae094c4ea",
    label: "manager",
    groupId: "urn:telicent:groups:manager",
    description: "Group for all managers",
    active: false,
  },
  {
    _id: "64d27aae0e121de092c20621",
    label: "developers",
    groupId: "urn:telicent:groups:developers",
    description: "Group for all developers",
    active: true,
  },
  {
    _id: "64d27b1c588b7f231aa924ef",
    label: "c-suite",
    groupId: "urn:telicent:groups:c-suite",
    description: "Group for all c-suite",
    active: true,
  },
];

export const exampleHierarchy = {
  uuid: "31127653-a234-48bc-b940-34c866bfe384",
  name: "clearance",
  tiers: ["O", "S", "TS"],
  readOnly: true,
};
