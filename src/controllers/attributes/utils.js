import { buildErrorObject } from "../utils";
// import { READONLY_CODE } from "../constants";

// export const isValidPayload = ({ name, tiers } = {}) =>
//   typeof name === "string" &&
//   Array.isArray(tiers) &&
//   tiers.some((item) => item !== "");

// export const sendReadOnlyResponse = (res) =>
//   res
//     .status(READONLY_CODE)
//     .send(buildErrorObject(READONLY_CODE, "Label is read-only"));

export const sendNotFound = (res) =>
  res.status(404).send(buildErrorObject(404, "Attribute(s) not found"));
