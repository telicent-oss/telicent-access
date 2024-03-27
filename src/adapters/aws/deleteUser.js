import config from "../../config";
import { cognito } from "./createUser";

export default async (id) => {
  const params = {
    UserPoolId: config.authUserPoolId,
    Username: id,
  };
  return await cognito.adminDeleteUser(params).promise();
};
