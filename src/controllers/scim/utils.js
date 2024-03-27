import mongoose from "mongoose";

export const mapScimToUser = (user) => {
  const id = new mongoose.Types.ObjectId();
  const { externalId, userName, name, displayName, emails, groups } = user;
  const create = {
    _id: id,
    id,
    externalId: externalId || userName,
    userName,
    labels: [],
    groups: groups || [],
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
  };

  const { value } = emails?.find((email) => email.primary);
  const email = value || (emails?.length ? emails[0].value : null);
  if (email) {
    create.email = email;
  }

  const mappedName =
    displayName ||
    (name
      ? `${name?.givenName || ""} ${name?.middleName || ""} ${
          name?.familyName || ""
        }`
          .replace("  ", " ")
          .trim()
      : userName);
  if (mappedName) {
    create.name = mappedName;
  }

  return create;
};

export const mapMongoToScim = (user) => {
  const { _id, id, externalId, userName, groups, schemas } = user;

  return {
    id: _id || id,
    externalId,
    userName,
    groups,
    schemas,
  };
};

export const scimNotEnabledError = (res) =>
  res
    .status(405)
    .send(buildScimErrorObj(405, "SCIM is not enabled on this server"));

export const createListResponse = (
  totalResults,
  itemsPerPage,
  startIndex,
  Resources
) => ({
  totalResults,
  itemsPerPage,
  startIndex,
  schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  Resources,
});

export const buildScimErrorObj = (status, detail) => ({
  schemas: ["urn:ietf:params:scim:api:messages:2.0:Error"],
  status,
  detail,
});

export const sendErrorResponse = (res, error) =>
  res.status(error.status).send(error);
