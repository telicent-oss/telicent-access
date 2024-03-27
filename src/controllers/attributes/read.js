import attributesModel from "../../database/models/Attributes";
import { sendNotFound } from "./utils";
import { sendErrorResponse, sendResults } from "../utils";

export const getAllAttributes = async () => {
  try {
    const attributes = await attributesModel.find({}, { __v: 0 });
    return { data: attributes };
  } catch (error) {
    return { error };
  }
};

export const getAll = async (req, res) => {
  const { data, error } = await getAllAttributes();

  if (error) return sendErrorResponse(res, error);
  if (!data) return sendNotFound(res);
  sendResults(res, data);
};

export const getAttribute = async (req, res) => {
  try {
    const attributes = await attributesModel.findOne(
      { _id: req.params._id },
      { __v: 0 }
    );

    if (!attributes) return sendNotFound(res);
    sendResults(res, attributes);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};
