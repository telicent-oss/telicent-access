import { model, Schema } from "mongoose";

/**
 * @openapi
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6540c84426bc7a0bd66584aa
 *         groupId:
 *           type: string
 *           example: urn:telicent:groups:example
 *         label:
 *           type: string
 *           example: Example group name
 *         description:
 *           type: string
 *           example: A group defined as an example
 *         active:
 *           type: boolean
 *           default: false
 *         userCount:
 *           type: number
 *           required: false
 *           example: 1
 *     CreateGroup:
 *       type: object
 *       required:
 *         - label
 *         - description
 *         - active
 *       properties:
 *         label:
 *           type: string
 *           example: example
 *         description:
 *           type: string
 *           example: A group defined as an example
 *         active:
 *           type: boolean
 *           example: false
 *     CreateGroupSuccess:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             created:
 *               type: boolean
 *               example: true
 *             uuid:
 *               type: string
 *               example: urn:telicent:groups:example
 *     DeleteGroupSuccess:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             deleted:
 *               type: boolean
 *               example: true
 *     GroupBadRequest:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 400
 *         message:
 *           type: string
 *           example: Invalid request / Fields missing
 *     GroupsNotFound:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 404
 *         message:
 *           type: string
 *           example: Group(s) not found
 *     GroupAlreadyExists:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 409
 *         message:
 *           type: string
 *           example: Group already exists
 */
const groupSchema = new Schema({
  groupId: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default model("Groups", groupSchema);
