
import usersModel from "../../database/models/Users";
import { buildDataErrorObject } from "../utils";
import { deleteUserById } from "./delete";

export const create = async (user) => {
  try {
   
    const obj = new usersModel(user);
    const userObjectNotValid = obj.validateSync();

    if (userObjectNotValid) {
      const _ = await deleteUserById(user.id, true);
      return buildDataErrorObject(422, userObjectNotValid.message);
    }
    await obj.save();
    return { data: user};
  } catch (err) {
    return buildDataErrorObject(422, err.message);
  }
};



