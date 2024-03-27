import aws from "aws-sdk";
import config from "../../config";

const { authRegion, authUrl, authUserPoolId } = config;

const getOptions = () => {
  const options = { apiVersion: "2016-04-18", region: authRegion };
  if (authUrl) {
    options.endpoint = authUrl;
  }
  return options;
};

export const cognito = new aws.CognitoIdentityServiceProvider(getOptions());

export default async ({ email }) => {
  const cognitoParams = {
    UserPoolId: authUserPoolId,
    Username: email,
    DesiredDeliveryMediums: ["EMAIL"],
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

  const {
    User: { Username },
  } = await cognito.adminCreateUser(cognitoParams).promise();
  return Username;
};
