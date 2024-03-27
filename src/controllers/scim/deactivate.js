import usersModel from "../../database/models/Users";
import {
  scimNotEnabledError,
  sendErrorResponse,
  buildScimErrorObj,
} from "./utils";
import { sendResults, sendUpdateSuccess } from "../utils";

const deactivateUserById = async (id) => {
  try {
    const result = await usersModel.updateOne(
      { _id: id },
      { $set: { active: false } }
    );

    if (!result || result.deactivatedCount === 0)
      return { error: buildScimErrorObj(422, "User deactivation failed") };

    return { data: { ok: true } };
  } catch (err) {
    return { error: buildScimErrorObj(422, err.message) };
  }
};

export const deactivateUser = (isScimEnabled) => async (req, res) => {
  if (!isScimEnabled) {
    return scimNotEnabledError(res);
  }

  const { data, error } = await deactivateUserById(req.params.userId);
  if (error) return sendErrorResponse(res, error);
  sendResults(res, data);
};

export const patchUser = (isScimEnabled) => async (req, res) => {
  if (!isScimEnabled) {
    return scimNotEnabledError(res);
  }

  const { Operations } = req.body;
  const updates = Operations.filter((changes) => {
    const {
      op,
      value,
      value: { active },
    } = changes;

    return (
      op === "replace" &&
      Object.keys(value).includes("active") &&
      active === false
    );
  });

  if (updates.length !== Operations.length) {
    return sendErrorResponse(
      res,
      buildScimErrorObj(
        501,
        "Operation in patch not supported, only user deactivation is supported from the SCIM Service provider"
      )
    );
  }

  const { error } = await deactivateUserById(req.params.id);
  if (error) return sendErrorResponse(res, error);
  sendUpdateSuccess(res);
};
