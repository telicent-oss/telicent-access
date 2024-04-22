import { model, Schema } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;
const InstantiatedLabels = {
  name: String,
  value: String,
  toString: String,
  toDataLabelString: String,
};

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       allOf:
 *         - $ref: '#/components/schemas/SCIMUser'
 *         - type: object
 *           properties:
 *             id:
 *               description: Identifier for the user in Telicent ACCESS
 *               type: string
 *               example: 507f1f77bcf86cd799439011
 *             externalId:
 *               description: Auth identifier for the user in Telicent ACCESS
 *               type: string
 *               example: 31127653-a234-48bc-b940-34c866bfe837
 *             name:
 *               type: string
 *               example: User
 *             userName:
 *               type: string
 *               example: User
 *             email:
 *               type: string
 *               example: newuser@telicent.io
 *             labels:
 *               type: array
 *               example: [
 *                 {
 *                   "name": "nationality",
 *                   "value": "GBR",
 *                   "toString": "nationality=\"GBR\"",
 *                   "toDataLabelString": "permittedNationalities='GBR'",
 *                   "_id": "6540c57326bc7a0bd6658494"
 *                 },
 *                 {
 *                   "name": "clearance",
 *                   "value": "S",
 *                   "toString": "clearance=\"S\"",
 *                   "toDataLabelString": "classification='S'",
 *                   "_id": "6540c57326bc7a0bd6658495"
 *                 },
 *                 {
 *                   "name": "personnelType",
 *                   "value": "GOV",
 *                   "toString": "personnelType=\"GOV\"",
 *                   "toDataLabelString": null,
 *                   "_id": "6540c57326bc7a0bd6658496"
 *                 },
 *                 {
 *                   "name": "deployedOrganisation",
 *                   "value": "Org1",
 *                   "toString": "deployedOrganisation=\"Org1\"",
 *                   "toDataLabelString": "permittedOrganisations='Org1'",
 *                   "_id": "6540c57326bc7a0bd6658497"
 *                 }
 *               ]
 *             active:
 *               type: boolean
 *               example: false
 *             userGroups:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["urn:telicent:groups:developers", "urn:telicent:groups:group2"]
 *             schemas:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["urn:ietf:params:scim:schemas:core:2.0:User"]
 *     CreateUserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: User
 *         email:
 *           type: string
 *           example: newuser@telicent.io
 *         clearance:
 *           type: string
 *           enum: ["O", "OS", "S", "TS"]
 *         deployedOrganisation:
 *           type: string
 *           example: Organisation name
 *         nationality:
 *           type: string
 *           example: GBR
 *         personnelType:
 *           type: string
 *           enum: ["GOV", "NON-GOV"]
 *         active:
 *           type: boolean
 *           example: false
 *         userGroups:
 *           type: array
 *           items:
 *             type: string
 *           example: ["urn:telicent:groups:developers", "urn:telicent:groups:group2"]
 *     CreateUserSuccess:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *     UpdateUserSuccess:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         updated:
 *           type: boolean
 *           example: true
 *     DeleteUserSuccess:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *           example: true
 *     UserInvalidRequest:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 400
 *         message:
 *           type: string
 *           example: Invalid request
 *     UserNotFound:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 404
 *         message:
 *           type: string
 *           example: User not found
 *     UnableToCreateUser:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 405
 *         message:
 *           type: string
 *           example: When SCIM is enabled, users cannot be created through ACCESS
 *     UserExists:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 409
 *         message:
 *           type: string
 *           example: User already exists in IdP
 *     UserInvalid:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 422
 *         message:
 *           type: string
 *           example: Operation failed / User object invalid / Operator not supported
 */
const userSchema = new Schema({
  _id: ObjectId,
  id: { type: String, required: true },
  externalId: { type: String, unique: true },
  name: { type: String, required: true },
  userName: { type: String },
  email: { type: String, required: true, index: true },
  labels: { type: [InstantiatedLabels] },
  active: { type: Boolean, required: true, default: false },
  groups: { type: [String] },
  userGroups: { type: [String] },
  schemas: { type: [String] },
});

export default model("Users", userSchema);
