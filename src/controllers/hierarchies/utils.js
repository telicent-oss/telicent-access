import { buildErrorObject } from "../utils";

export const sendNotFound = (res) =>
  res.status(404).send(buildErrorObject(404, "Hierarchy/ies not found"));
