import groupsModel from "../../database/models/Groups";
import { sendNotFound } from "./utils";
import { sendErrorResponse, sendResults } from "../utils";
import { Types } from "mongoose";

export const getAllGroups = async (label) => {
  try {
    const groups = await groupsModel.aggregate([
      {
        $match: label ? { label: { $regex: `^${label}`, $options: "i" } } : {},
      },
      {
        $lookup: {
          from: "users",
          localField: "group_id",
          foreignField: "userGroups",
          as: "users",
        },
      },
      { $addFields: { userCount: { $size: "$users" } } },
      { $project: { users: 0, __v: 0 } },
    ]);

    return { data: groups };
  } catch (error) {
    const { code } = error;
    if (!code || code > 500) {
      error.code = 500;
    }
    return { error };
  }
};

export const getAll = async (req, res) => {
  const { label } = req.query;
  const { data, error } = await getAllGroups(label);
  if (error) return sendErrorResponse(res, error);
  if (!data) return sendNotFound(res);
  sendResults(res, data);
};

export const getGroup = async (req, res) => {
  const { group } = req.params;

  try {
    const groups = await groupsModel.aggregate([
      { $match: { _id: Types.ObjectId.createFromHexString(group) } },
      { $project: { __v: 0 } },
      {
        $lookup: {
          from: "users",
          localField: "group_id",
          foreignField: "userGroups",
          as: "users",
        },
      },
            {
        $addFields: {
          users: {
            $map: {
              input: "$users",
              as: "user",
              in: {
                id: "$$user.id",
                name: "$$user.name",
                email: "$$user.email",
                active: "$$user.active",
                labels: "$$user.labels",
                userGroups: "$$user.userGroups",
              },
              },
            },
        },
      },
      { $addFields: { userCount: { $size: "$users" } } },
    ]);

    if (!groups || groups.length === 0) return sendNotFound(res);

    sendResults(res, groups[0]);
  } catch (error) {
    const { code } = error;
    if (!code || code > 500) {
      error.code = 500;
    }
    sendErrorResponse(res, error);
  }
};
