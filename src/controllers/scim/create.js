import usersModel from "../../database/models/Users";
import {
  buildScimErrorObj,
  mapMongoToScim,
  mapScimToUser,
  scimNotEnabledError,
  sendErrorResponse,
} from "./utils";

const create = async (user) => {
  try {
    // Need to create auth user to obtain its UUID.
    const obj = new usersModel(user);
    const userObjectNotValid = obj.validateSync();

    if (userObjectNotValid) {
      return { error: buildScimErrorObj(422, userObjectNotValid.message) };
    }
    await obj.save();
    return { data: mapMongoToScim(user) };
  } catch (err) {
    const { code, message } = err;
    if (code === 11000) {
      return {
        error: buildScimErrorObj(409, "User already exists"),
      };
    }
    return { error: buildScimErrorObj(422, message) };
  }
};

export const createUser = (isScimEnabled) => async (req, res) => {
  if (!isScimEnabled) {
    return scimNotEnabledError(res);
  }
  const user = mapScimToUser(req.body);
  const { externalId, userName } = user;
  const exists = await usersModel
    .find({
      $or: [{ externalId }, { userName }],
    })
    .exec();

  if (exists && Array.isArray(exists) && exists.length > 0) {
    return sendErrorResponse(
      res,
      buildScimErrorObj(409, "User already exists")
    );
  }
  const { data, error } = await create(user);
  if (error) {
    return sendErrorResponse(res, error);
  }
  res.status(201).json(data);
};
