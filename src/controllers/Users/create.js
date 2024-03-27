import { createAuthUser } from "../../adapters";
import usersModel from "../../database/models/Users";
import { deleteUserById } from "./delete";
import { mapRequestToUser } from "./utils";
import { buildDataErrorObject } from "../utils";

const create = async (user) => {
  try {
    // Need to create auth user to obtain its UUID.
    user.externalId = await createAuthUser(user);
    delete user.temporaryPassword;
    const obj = new usersModel(user);
    const userObjectNotValid = obj.validateSync();

    if (userObjectNotValid) {
      const _ = await deleteUserById(user.externalId, true);
      return buildDataErrorObject(422, userObjectNotValid.message);
    }
    await obj.save();
    return { data: { id: user.id } };
  } catch (err) {
    if (err.code === "UsernameExistsException") {
      return buildDataErrorObject(409, "User already exists in IdP");
    }
    return buildDataErrorObject(422, err.message);
  }
};

export const createUser = (isScimEnabled) => async (req, res) => {
  if (isScimEnabled)
    return res.status(405).send({
      code: 405,
      message: "When SCIM is enabled, users cannot be created through ACCESS",
    });
  const { body } = req;
  const { ok, field } = validateBody(body);
  if (!ok) {
    return res.status(422).send({
      code: 422,
      message: `User validation failed: ${field} is required and was missing`,
    });
  }
  const mapped = mapRequestToUser(body);
  if (body.temporaryPassword) {
    mapped.temporaryPassword = body.temporaryPassword;
  }
  const { data, error } = await create(mapped);
  if (error) {
    return res.status(error.code).send(error);
  }
  return res.status(201).json(data);
};

const REQUIRED_FIELDS = [
  "name",
  "email",
  "nationality",
  "deployedOrganisation",
  "personnelType",
  "clearance",
];
const validateBody = (input) => {
  let ok = true;
  let missingField = null;
  const keys = Object.keys(input);
  REQUIRED_FIELDS.every((field) => {
    ok = keys.includes(field);
    if (!ok) {
      missingField = field;
    }
    return ok;
  });
  return { ok, field: missingField };
};
