import groupsModel from "../../database/models/Groups";
import { isGroupNameValid, isValidPayload } from "./utils";
import {
  isBodyEmpty,
  sendErrorResponse,
  sendInvalidRequest,
  setupSuccessResponseCode,
} from "../utils";
import { CREATE_CODE } from "../constants";

const sendSuccessCreated = setupSuccessResponseCode(CREATE_CODE)("created");
const organisation = "telicent";

export const createGroup = async (req, res) => {
  const { body } = req;

  if (isBodyEmpty(body) || !isValidPayload(body))
    return sendInvalidRequest(res);

  const { label, description } = body;

  if (!label || !description) {
    return sendErrorResponse(res, {
      code: 400,
      message: `Fields missing: ${!label ? "Name, " : ""}${!description ? "Description" : ""
        }`.replace(/,\s*$/, ""),
    });
  }

  const id = `urn:${organisation}:groups:${label}`;
  if (!isGroupNameValid(label)) {
    return sendErrorResponse(res, {
      code: 400,
      message: "The group name contains invalid characters.",
      detail: "https://github.com/telicent-oss/rdf-abac/blob/main/docs/abac-specification.md#syntax-of-words",
    });
  }
  const payload = {
    group_id: id,
    label,
    description,
    active: true,
  };

  try {
    const groups = await groupsModel.findOne({ group_id: id }, { __v: 0 });

    if (groups) {
      return res.status(409).send({
        code: 409,
        message: "A group with this name already exists",
      });
    }

    const { error, group_id } = await groupsModel.create(payload);

    if (error) return sendErrorResponse(res, error);
    sendSuccessCreated(res, group_id);
  } catch (error) {
    const { code } = error;
    if (code === 11000) {
      error.code = 409;
      error.message = `Group with ${Object.keys(error.keyPattern)[0]
        }, ${label}, already exists`;
    }
    sendErrorResponse(res, error);
  }
};
