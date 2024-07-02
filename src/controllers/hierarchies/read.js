import Attributes from "../../database/models/Attributes";
import { sendNotFound } from "./utils";
import { sendErrorResponse, sendResults } from "../utils";

export const getAllHierarchies = async () => {
  try {
    const groups = await Attributes.find(
      { "value.type": "hierarchy" },
      { __v: 0 }
    );

    return { data: groups.map(mapToHierarchy) };
  } catch (error) {

    return { error };
  }
};

export const getAll = async (req, res) => {
  const { data, error } = await getAllHierarchies();

  if (error) return sendErrorResponse(res, error);
  if (!data) return sendNotFound(res);
  sendResults(res, data);
};

export const getHierarchy = async (req, res) => {
  try {
    const group = await Attributes.findOne(
      { _id: req.params.hierarchyId },
      { __v: 0 }
    );
    if (!group) return sendNotFound(res);
    sendResults(res, mapToHierarchy(group));
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

export const getHierarchyLookup = async (req, res) => {
  const { query, params } = req;
  
  try {
    const key =
      query.isUserAttribute?.toLowerCase() === "true"
        ? "user_attribute_name"
        : "data_attribute_name";

    const group = await Attributes.findOne(
      { [key]: params.name, "value.type": "hierarchy" },
      { __v: 0 }
    );

    if (!group) return sendNotFound(res);

    sendResults(res, mapToHierarchy(group));
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

const mapToHierarchy = (attr) => {
  const {
    _id,
    data_attribute_name,
    value: { values },
    readonly,
  } = attr;

  return {
    uuid: _id,
    name: data_attribute_name,
    tiers: values,
    readonly,
  };
};
