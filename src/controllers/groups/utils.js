import { buildErrorObject } from "../utils";

export const isValidPayload = ({ label, description } = {}) =>
  typeof label === "string" && typeof description === "string";

export const sendNotFound = (res) =>
  res.status(404).send(buildErrorObject(404, "Group(s) not found"));

export const isGroupNameValid = (input) => {
  const regex = new RegExp(/^[A-Za-z_]([A-Za-z0-9_\.\-:+]*[A-Za-z0-9_])?$/);
  return regex.test(input)
}
