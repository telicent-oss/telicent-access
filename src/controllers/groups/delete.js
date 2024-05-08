import groupsModel from "../../database/models/Groups";
import { sendNotFound } from "./utils";
import { sendErrorResponse, setupSuccessResponseAction } from "../utils";

const sendDeleteSuccess = setupSuccessResponseAction("deleted");

export const deleteGroup = async (req, res) => {
  const { group_id } = req.params;
  try {
    const group = await groupsModel.findOne({ group_id }, { __v: 0 });
    if (!group) return sendNotFound(res);

    const { err } = await groupsModel.updateOne(
      { group_id: { $eq: group_id } },
      { active: false }
    );
    if (err) return sendErrorResponse(res, err);

    sendDeleteSuccess(res);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};
