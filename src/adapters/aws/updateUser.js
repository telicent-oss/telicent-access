import config from "../../config";
import { cognito } from "./createUser";

export default async ({ payload: { uuid, email } }) => {
  const params = {
    UserPoolId: config.authUserPoolId,
    Username: uuid,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
  };
  return await cognito.adminUpdateUserAttributes(params).promise();
};
