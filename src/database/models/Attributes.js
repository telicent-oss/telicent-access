import { model, Schema } from "mongoose";

/**
 * @openapi
 * components:
 *   schemas:
 *     Attributes:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 653f71ef35fe27f9f7ff1627
 *         userAttributeName:
 *           type: string
 *           example: personnelType
 *         dataAttributeName:
 *           type: string
 *           example: personnelType
 *         value:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               example: enum
 *             values:
 *               type: array
 *               example: ["GOV", "NON-GOV"]
 *         isIhm:
 *           type: boolean
 *           example: false
 *         readOnly:
 *           type: boolean
 *           example: false
 *     AttributesToStrings:
 *       type: array
 *       example: [
 *         "permittedNationalities='GBR'",
 *         "classification='OS'",
 *         "permittedOrganisations='Org1'",
 *         "urn:telicent:groups:G1:and",
 *         "urn:telicent:groups:G2:and",
 *         "urn:telicent:groups:G3:or",
 *         "urn:telicent:groups:G4:or"
 *       ]
 *     AttributesNotFound:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 404
 *         message:
 *           type: string
 *           example: Attribute(s) not found
 *     Hierarchy:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           example: 64d25a470a97a540165757da
 *         name:
 *           type: string
 *           example: classification
 *         tiers:
 *           type: array
 *           example: [O, OS, S, TS]
 *         readOnly:
 *           type: boolean
 *     HierarchyNotFound:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 404
 *         message:
 *           type: string
 *           example: Hierarchy/ies not found
 */
const attributeSchema = new Schema({
  userAttributeName: { type: String, required: true, unique: true },
  dataAttributeName: { type: String, unique: true },
  value: {
    type: {
      type: String,
      enum: ["enum", "hierarchy", "string", "numeric"],
      index: true,
    },
    values: { type: [String], default: null },
  },
  isIhm: { type: Boolean, default: false },
  readOnly: { type: Boolean, default: false },
});

export default model("Attributes", attributeSchema);
