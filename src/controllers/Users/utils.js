import mongoose from "mongoose";
import { attributeMapping } from "../../database/defaults";

export const mapRequestToUser = (body) => {
  const id = mongoose.Types.ObjectId();
  let { name, email, active, userGroups } = body;
  const ignoreKeys = ["name", "email", "attributes", "active", "userGroups"];

  email = email?.toLowerCase() || null;
  const user = {
    _id: id,
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

  Object.entries(body).forEach(([k, v]) => {
    const dataName = attributeMapping[k];
    if (ignoreKeys.includes(k)) {
      return;
    }
    user.labels.push({
      name: k,
      value: v,
      toString: `${k}='${v}'`,
      toDataLabelString: dataName ? `${dataName}='${v}'` : null,
    });
  });

  return user;
};
