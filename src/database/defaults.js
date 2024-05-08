import labelModel from "./models/Attributes";
import ccData from "../data/country-code";

export const DEFAULT_ATTRIBUTES = [
  {
    userAttributeName: "clearance",
    dataAttributeName: "classification",
    value: {
      type: "hierarchy",
      values: ["O", "OS", "S", "TS"],
    },
    isIhm: true,
    readOnly: true,
    isUserRequired: true,
  },
  {
    userAttributeName: "nationality",
    dataAttributeName: "permitted_nationalities",
    value: {
      type: "enum",
      values: ccData.map((cc) => cc.Alpha3.trim()),
    },
    isIhm: true,
    readOnly: true,
    isUserRequired: true,
  },
  {
    userAttributeName: "deployed_organisation",
    dataAttributeName: "permitted_organisations",
    value: {
      type: "string",
      values: null,
    },
    isIhm: true,
    readOnly: true,
    isUserRequired: true,
  },
  {
    userAttributeName: "personnel_type",
    dataAttributeName: null,
    value: {
      type: "enum",
      values: ["GOV", "NON-GOV"],
    },
    isIhm: true,
    readOnly: true,
    isUserRequired: true,
  },
];

export const attributeMapping = DEFAULT_ATTRIBUTES.reduce(
  (acc, { userAttributeName, dataAttributeName }) => {
    acc[userAttributeName] = dataAttributeName;
    return acc;
  },
  {}
);

export const createDefaultAttributes = async () => {
  const { error } = await labelModel.insertMany(DEFAULT_ATTRIBUTES);
  return { error };
};
