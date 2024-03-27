const {
  env: {
    AUTH_REGION,
    AUTH_TYPE,
    AUTH_URL,
    AUTH_USER_POOL_ID,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    DEBUG,
    DEPLOYED_DOMAIN,
    JWKS_URL,
    JWT_HEADER,
    MONGO_COLLECTION,
    MONGO_PWD,
    MONGO_RETRY_REWRITES,
    MONGO_URL,
    MONGO_USER,
    PORT,
    SCIM_ENABLED,
  },
} = process;

export default {
  /************************ DATABASE ******************************************/
  mongoUrl: MONGO_URL || "127.0.0.1:27017",
  mongoCollection: MONGO_COLLECTION || "access",
  mongoUser: MONGO_USER || "telicent-access",
  mongoPwd: MONGO_PWD || "password",
  /************************ END OF DATABASE ***********************************/

  /************************ AUTH **********************************************/
  // Current supported types:
  // aws (Cognito)
  // keycloak
  authType: AUTH_TYPE || "aws",

  // Used by both Cognito and Keycloak.
  authUrl: AUTH_URL || undefined,

  /*
    To get this key in Keycloak, navigate to the master realm and select
    Clients > admin-cli.
    Ensure client authentication is enabled in the Capability config section and
    also check the service accounts roles checkbox.
    Save the changes, then select the Credentials tab and from there you can
    copy your secret.
  */
  authSecretKey: AWS_SECRET_ACCESS_KEY || null,

  // For local Cognito, the ID is the name of the JSON file created in
  // ./cognito/db
  // For Keycloak, the ID is the name of the realm.
  authUserPoolId: AUTH_USER_POOL_ID || "local_6GLuhxhD",

  // Cognito-specific.
  authAccessKey: AWS_ACCESS_KEY_ID || null,
  authRegion: AUTH_REGION || "eu-west-2",
  /************************ END OF AUTH ***************************************/

  port: PORT || 8091,
  accessUrl: DEPLOYED_DOMAIN || "http://localhost:8091",
  debug: DEBUG === "true",
  isScimEnabled: SCIM_ENABLED === "true",
  mongoRetryRewrites: MONGO_RETRY_REWRITES || true,
  jwksUrl: JWKS_URL || undefined,
  jwtHeader: JWT_HEADER || "Authorization",
};
