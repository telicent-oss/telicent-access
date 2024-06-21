const {
  env: {
    DEBUG,
    DEPLOYED_DOMAIN,
    GROUPS_KEY,
    OPENID_PROVIDER_URL,
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
  port: PORT || 8091,
  accessUrl: DEPLOYED_DOMAIN || "http://localhost:8091",
  debug: DEBUG === "true",
  isScimEnabled: SCIM_ENABLED === "true",
  mongoRetryRewrites: MONGO_RETRY_REWRITES || true,
  openidProviderUrl: OPENID_PROVIDER_URL || undefined,
  jwtHeader: JWT_HEADER || "authorization",
  groupKey: GROUPS_KEY || "groups"
};
