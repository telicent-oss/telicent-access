import { buildErrorObject } from "../utils";

export const isValidPayload = ({ label, description } = {}) =>
  typeof label === "string" && typeof description === "string";

export const sendNotFound = (res) =>
  res.status(404).send(buildErrorObject(404, "Group(s) not found"));

export const isGroupNameValid = (input) => {
  // Check to see if string is null or undefined
  if (Boolean(input) === false) return false;
  const regex = new RegExp(
    "^" + // ^ - Starts with...
    "[A-Za-z_]" + // letter char (uppercase or lowercase) or an underscore
    "(" + // ( - START optional capture groupe
    "[A-Za-z0-9_\\.\\-:+]*" + // Zero or more letters, digits, _, ., -, : or +
    "[A-Za-z_]" + // IF additional characters
    // THEN last char must be a letter, digit, or underscore
    ")?" + // )? - END optional capturing group
    "$"
  );
  return regex.test(input)
}
