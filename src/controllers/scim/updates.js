import {
  scimNotEnabledError,
  sendErrorResponse,
  buildScimErrorObj,
} from "./utils";

export const putUser = (isScimEnabled) => async (req, res) => {
  if (!isScimEnabled) {
    return scimNotEnabledError(res);
  }

  return sendErrorResponse(
    res,
    buildScimErrorObj(501, "User updates are not currently enabled in ACCESS")
  );
};
