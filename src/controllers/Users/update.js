import usersModel from "../../database/models/Users";
import {
  buildDataErrorObject,
  isBodyEmpty,
  sendErrorResponse,
  sendResults,
  sendInvalidRequest,
} from "../utils";
import { attributeMapping } from "../../database/defaults";

const update = async (id, update) => {
  try {
    const { modifiedCount } = await usersModel.updateOne({ id }, update, {
      runValidators: true,
    });

    if (modifiedCount === 0) return { data: { id, updated: false } };

    return { data: { id, updated: true } };
  } catch (err) {
    return buildDataErrorObject(422, err.message);
  }
};

export const updateUser = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  if (isBodyEmpty(body)) return sendInvalidRequest(res);

  const attributes = await usersModel.findOne({ id }, "-_id -__v");
  if (!attributes) {
    return sendErrorResponse(res, { code: 404, message: "User not found" });
  }

  const updateObj = mapUpdateReqToUpdateUser(body, attributes);
  if (Object.keys(updateObj).length === 0) return sendInvalidRequest(res);

  const { data, error } = await update(id, updateObj);
  if (error) return sendErrorResponse(res, error);


  sendResults(res, data);
};

const mapUpdateReqToUpdateUser = (body, current) => {
  const topLevel = [
    "id",
    "name",
    "userName",
    "email",
    "active",
    "userGroups",
    "schemas",
  ];
  const { email, userGroups } = body;
  const updateObj = {
    email,
    userGroups,
  };
  delete body.email;
  delete body.userGroups;

  const { labels } = current;

  Object.entries(body).forEach(([k, v]) => {
    if (topLevel.includes(k)) {
      if (current[k] !== v) {
        updateObj[k] = v;
      }
    } else {
      updateLabels(labels, k, v);
    }
  });

  updateObj.labels = labels;

  return updateObj;
};

const updateLabels = (labelsToUpdate, k, v) => {
  const label = labelsToUpdate.find((lbl) => lbl.name === k);
  const dataName = attributeMapping[k];
  const toString = `${k}='${v}'`;
  const toDataLabelString = dataName ? `${dataName}='${v}'` : null;
  if (!label) {
    const newLabel = {
      name: k,
      value: v,
      toString,
      toDataLabelString,
    };
    labelsToUpdate.push(newLabel);
  } else {
    label.value = v;
    label.toString = toString;
    label.toDataLabelString = toDataLabelString;
  }
};