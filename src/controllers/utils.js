import { SUCCESS_CODE, INVALID_CODE } from "./constants";

export const buildErrorObject = (code, message) => ({
  code,
  message,
});

export const buildDataErrorObject = (code, message) => ({
  data: null,
  error: buildErrorObject(code, message),
});

/**
 *
 * @param {Object} body
 * @returns {bool}
 */
export const isBodyEmpty = (body = {}) => Object.keys(body).length === 0;

export const sendInvalidRequest = (res) =>
  res
    .status(INVALID_CODE)
    .send(buildErrorObject(INVALID_CODE, "Invalid request"));

export const sendErrorResponse = (res, { code, message }) =>
  res.status(code).send(buildErrorObject(code, message));

export const setupSuccessResponseCode = (code) => (action) => (res, id) => {
  const obj = {
    [action]: true,
  };
  if (id) {
    obj.uuid = id;
  }
  return res.status(code).send({
    data: obj,
  });
};

/**
 * Setup Success action string. Action is an object key so must follow variable
 * naming conventions.
 * Returns a function which can be invoked with a response object.
 * @param {string} action
 * @returns {Function}
 */
export const setupSuccessResponseAction =
  setupSuccessResponseCode(SUCCESS_CODE);

export const sendResults = (res, data) => res.status(SUCCESS_CODE).json(data);
export const sendUpdateSuccess = (res) => res.status(204).send();
