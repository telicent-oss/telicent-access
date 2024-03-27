import usersModel from "../../database/models/Users";
import { deleteAuthUser } from "../../adapters";
import { buildDataErrorObject, sendErrorResponse, sendResults } from "../utils";

/**
 * Delete user from auth provider and database
 * @param {string} id
 * @returns {Object}
 */
export const deleteUserById = async (id) => {
  try {
    const user = await usersModel.findOne({
      id,
    });

    await deleteAuthUser(user.externalId);
    const result = await usersModel.deleteOne({ _id: id });

    if (result.deletedCount === 0)
      return buildDataErrorObject(422, "User delete failed");

    return { data: { ok: true } };
  } catch (err) {
    return buildDataErrorObject(422, err.message);
  }
};

export const deleteUser = async (req, res) => {
  const { data, error } = await deleteUserById(req.params.id);
  if (error) return sendErrorResponse(res, error);
  sendResults(res, data);
};

const deactivateUserById = async (id) => {
  try {
    const user = await usersModel.findOne({
      _id: id,
    });
    if (!user) {
      return buildDataErrorObject(404, "User not found");
    }
    const result = await usersModel.updateOne(
      { _id: id },
      { $set: { active: false } }
    );

    if (!result || result.updatedCount === 0)
      return buildDataErrorObject(422, "User deactivation failed");

    return { data: { ok: true } };
  } catch (err) {
    return buildDataErrorObject(422, err.message);
  }
};

export const deactivateUser = async (req, res) => {
  const { data, error } = await deactivateUserById(req.params.id);
  if (error) return sendErrorResponse(res, error);
  sendResults(res, data);
};
