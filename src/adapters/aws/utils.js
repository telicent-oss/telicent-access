import { Types } from "mongoose";
import aws from "aws-sdk";

import config from "../../config";

const getOptions = () => {
  const { authAccessKey, authRegion, authSecretKey, authUrl } = config;
  const options = {
    apiVersion: "2016-04-18",
    region: authRegion,
  };

  if (authUrl) {
    options.endpoint = authUrl;
  }
  if (authSecretKey) {
    options.secretAccessKey = authSecretKey;
  }
  if (authAccessKey) {
    options.accessKeyId = authAccessKey;
  }
  return options;
};

export const cognito = new aws.CognitoIdentityServiceProvider(getOptions());

export const setFilterArgument =
  (mongoUsers = []) =>
  (awsUser) =>
    !mongoUsers.some(
      (u) =>
        u.externalId ===
        awsUser.Attributes.find((attr) => attr.Name === "sub").Value
    );

export const mapAwsToScim = (user) => {
  const id = new Types.ObjectId();
  const { Attributes, Username } = user;
  const scimUser = {
    _id: id,
    id,
    externalId: Attributes.find((attr) => attr.Name === "sub").Value,
    userName: Username,
    name: Username,
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    labels: [],
    groups: [],
  };
  return scimUser;
};
