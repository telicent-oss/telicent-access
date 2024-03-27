import usersModel from "../../database/models/Users";
import { buildDataErrorObject, sendErrorResponse } from "../utils";
import logger from "../../lib/logger";

export const getAllUsers = async (filters) => {
  try {
    // Lean allows deletion of object keys e.g. _id
    const users = await usersModel.find({}, `-_id ${filters}`).lean().exec();
    return { data: users };
  } catch (err) {
    return buildDataErrorObject(422, err.message);
  }
};

export const getAll = async (req, res) => {
  const { data, error } = await getAllUsers("-__v");
  if (error) return sendErrorResponse(res, error);
  res.status(200).json(data);
};

const getAttributes = async (id) => {
  try {
    const attributes = await usersModel
      .findOne({ id }, "-__v -_id -externalId -groups")
      .exec();

    if (!attributes) {
      return buildDataErrorObject(404, "User not found");
    }

    return { data: attributes.toObject() };
  } catch (err) {
    return buildDataErrorObject(422, err.message);
  }
};

export const getUserAttributes = async (req, res) => {
  const { data, error } = await getAttributes(req.params.id);
  if (error) {
    res.status(error.code).json(error);
    return;
  }

  res.status(200).json(data);
};

const getAttributesByEmail = async (email) => {
  try {
    const result = await usersModel
      .findOne({ email })
      .select({
        labels: 1,
        id: 1,
        _id: 0,
        userGroups: 1,
        active: 1,
      })
      .exec();
    if (!result) {
      return buildDataErrorObject(404, "User not found");
    }
    if (!result.active) {
      return {
        data: {
          id: result.id,
          attributes: [],
        },
      };
    }
    const attributes = [
      ...result.labels
        .filter((label) => label.toDataLabelString)
        .map((label) => label.toDataLabelString),
      ...result.userGroups.map((group) => `${group}:and`),
      ...result.userGroups.map((group) => `${group}:or`),
    ];

    return {
      data: {
        id: result.id,
        attributes,
      },
    };
  } catch (err) {
    return buildDataErrorObject(422, err.message);
  }
};

export const getUserFromEmail = async (req, res) => {
  const email = req.params.email;

  const { data, error } = await getAttributesByEmail(email);
  if (error) {
    res.status(error.code).json(error);
    return;
  }

  logger.debug("User: ", email, " retrieves with attributes: ", data);
  res.status(200).json(data);
};

const getUserFromToken = async (token) => {
  const { email, sub } = token;
  try {
    const result = await usersModel
      .findOne({ email, externalId: sub })
      .select({
        name: 1,
        _id: 0,
        labels: 1,
        userGroups: 1,
        active: 1,
      })
      .exec();
    if (!result) {
      return buildDataErrorObject(404, "User not found");
    }
    const { active, labels, name, userGroups } = result;
    const attributes = labels
      .filter((label) => label.toString)
      .reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
      }, {});

    return {
      data: {
        userId: sub,
        userName: name,
        email,
        attributes,
        active,
        groups: userGroups,
      },
    };
  } catch (err) {
    return buildDataErrorObject(422, err.message);
  }
};

export const getUserDetails = async (req, res) => {
  const { data, error } = await getUserFromToken(req.token);
  if (error) {
    res.status(error.code).json(error);
    return;
  }

  return res.status(200).json(data);
};
