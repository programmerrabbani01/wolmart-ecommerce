import express from "express";
import tokenVerify from "../middlewares/verifyToken.js";
import {
  createRole,
  deleteRole,
  getAllRole,
  getSingleRole,
  updateRole,
  updateRoleStatus,
} from "../controller/roleController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllRole).post(createRole);
router.route("/:id").get(getSingleRole).delete(deleteRole).put(updateRole);
router.route("/status/:id").patch(updateRoleStatus);

//export
export default router;
