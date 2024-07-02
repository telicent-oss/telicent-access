import { Types } from "mongoose";

export const mapSkeletonToUser = (body) => {
  const id = new Types.ObjectId();
  let { name, email, active, userGroups, externalId } = body;

  email = email?.toLowerCase() || null;
  const user = {
    _id: id,
    externalId,
    id,
    name,
    userName: email,
    email,
    labels: [],
    active,
    groups: [],
    userGroups,
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
  };
  return user;
};
