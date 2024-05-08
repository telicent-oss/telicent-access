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
 *         user_attribute_name:
 *           type: string
 *           example: personnel_type
 *         data_attribute_name:
 *           type: string
 *           example: personnel_type
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
 *         readonly:
 *           type: boolean
 *           example: false
 *     AttributesToStrings:
 *       type: array
 *       example: [
 *         "permitted_nationalities='GBR'",
 *         "classification='OS'",
 *         "permitted_organisations='Org1'",
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
 *         readonly:
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
  user_attribute_name: { type: String, required: true, unique: true },
  data_attribute_name: { type: String, unique: true },
  value: {
    type: {
      type: String,
      enum: ["enum", "hierarchy", "string", "numeric"],
      index: true,
    },
    values: { type: [String], default: null },
  },
  isIhm: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
});

export default model("Attributes", attributeSchema);
