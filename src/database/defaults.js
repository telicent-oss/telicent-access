import labelModel from "./models/Attributes";
import ccData from "../data/country-code";

export const DEFAULT_ATTRIBUTES = [
  {
    user_attribute_name: "clearance",
    data_attribute_name: "classification",
    value: {
      type: "hierarchy",
      values: ["O", "OS", "S", "TS"],
    },
    ihm: true,
    readonly: true,
    user_required: true,
  },
  {
    user_attribute_name: "nationality",
    data_attribute_name: "permitted_nationalities",
    value: {
      type: "enum",
      values: ccData.map((cc) => cc.Alpha3.trim()),
    },
    ihm: true,
    readonly: true,
    user_required: true,
  },
  {
    user_attribute_name: "deployed_organisation",
    data_attribute_name: "permitted_organisations",
    value: {
      type: "string",
      values: null,
    },
    ihm: true,
    readonly: true,
    user_required: true,
  },
  {
    user_attribute_name: "personnel_type",
    data_attribute_name: null,
    value: {
      type: "enum",
      values: ["GOV", "NON-GOV"],
    },
    ihm: true,
    readonly: true,
    user_required: true,
  },
];

export const attributeMapping = DEFAULT_ATTRIBUTES.reduce(
  (acc, { user_attribute_name, data_attribute_name }) => {
    acc[user_attribute_name] = data_attribute_name;
    return acc;
  },
  {}
);

export const createDefaultAttributes = async () => {
  const { error } = await labelModel.insertMany(DEFAULT_ATTRIBUTES);
  return { error };
};
