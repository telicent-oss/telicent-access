import groupsModel from "../../database/models/Groups";
import { sendNotFound } from "./utils";
import { sendErrorResponse, setupSuccessResponseAction } from "../utils";

const sendDeleteSuccess = setupSuccessResponseAction("deleted");

export const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await groupsModel.findOne({ groupId }, { __v: 0 });
    if (!group) return sendNotFound(res);

    const { err } = await groupsModel.updateOne(
      { groupId: { $eq: groupId } },
      { active: false }
    );
    if (err) return sendErrorResponse(res, err);

    sendDeleteSuccess(res);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};
