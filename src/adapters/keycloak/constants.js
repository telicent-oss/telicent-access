import config from "../../config";

const { authUrl, authUserPoolId } = config;
export const USER_REALM_URL = `${authUrl}/admin/realms/${authUserPoolId}/users`;
