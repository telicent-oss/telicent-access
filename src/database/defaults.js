import labelModel from "./models/Attributes";
import ccData from "../data/country-code";
import YAML from "yaml";
import fs from "fs";
import config from "../config";
import logger from "../lib/logger";

const ATTRIBUTE_FILE_PATH = config.attributesFilePath;

// Warning: do no modify these values as they are consumed downstream.
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

let attributes = DEFAULT_ATTRIBUTES;

const standardiseAttribute = (attribute) => {
  const keys = Object.keys(attribute);
  if (!keys.includes("data_attribute_name")) {
    throw new Error("Invalid attribute, missing data_attribute_name");
  }
  if (!keys.includes("value")) {
    throw new Error("Invalid attribute, missing value");
  } else {
    if (!"type" in attribute.value) {
      throw new Error(
        "Attribute value must have a valid type: countries, hierarchy, enum or string"
      );
    }
    if (attribute.value.type === "countries") {
      if (attribute.value.values) {
        logger.warn(
          "A set of values for attribute type countries cannot be provided, this will be ignored"
        );
      }
      attribute.value.values = ccData.map((cc) => cc.Alpha3.trim());
      attribute.value.type = "enum";
    }
    if (
      (attribute.value.type === "hierarchy" ||
        attribute.value.type === "enum") &&
      (!Array.isArray(attribute.value?.values) ||
        attribute.value.values.length <= 0)
    ) {
      throw new Error(
        "If attribute is type hierarchy or enum, a valid array of possible values must be provided"
      );
    }
    if (attribute.value.type === "string") {
      attribute.value.values = null;
    }
  }
  if (
    !keys.includes("user_attribute_name") ||
    !attribute.user_attribute_name ||
    attribute.user_attribute_name.length == 0
  ) {
    logger.debug(
      "data_attribute_name: ",
      attribute.data_attribute_name,
      " will be used as user_attribute_name"
    );
    attribute["user_attribute_name"] = attribute.data_attribute_name;
  }
  if (!keys.includes("user_required")) {
    attribute.user_required = true;
  }
  if (!keys.includes("ihm")) {
    attribute.ihm = false;
  }
  if (!keys.includes("readonly")) {
    attribute.readonly = true;
  }
  return attribute;
};
if (ATTRIBUTE_FILE_PATH) {
  logger.info("Attribute file path set to: ", ATTRIBUTE_FILE_PATH);
}
if (fs.existsSync(ATTRIBUTE_FILE_PATH)) {
  const file = fs.readFileSync(ATTRIBUTE_FILE_PATH, "utf-8");
  const parsedFile = YAML.parse(file);
  if (parsedFile.attributes && !Array.isArray(parsedFile.attributes)) {
    throw new Error(
      "Incorrect formatting of attributes file, must contain a key attributes and the value must be an array"
    );
  }
  logger.debug("Attributes file included, reading attributes");
  attributes = parsedFile.attributes.map(standardiseAttribute);
} else if (ATTRIBUTE_FILE_PATH) {
  logger.error(
    "Attribute file path set but no file could be found, unset to use the default or check your file exists"
  );
}

export const attributeMapping = attributes.reduce(
  (acc, { user_attribute_name, data_attribute_name }) => {
    acc[user_attribute_name] = data_attribute_name;
    return acc;
  },
  {}
);

export const createDefaultAttributes = async () => {
  const { error } = await labelModel.insertMany(attributes);
  return { error };
};
