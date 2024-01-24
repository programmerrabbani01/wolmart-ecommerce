import express from "express";
import {
  loggedInUser,
  userAccountActivision,
  userLoOut,
  userLogin,
  userRegistration,
} from "../controller/authController.js";
import tokenVerify from "../middlewares/verifyToken.js";

//router
const router = express.Router();

//create routes
router.route("/login").post(userLogin);
router.route("/login/:token").post(userAccountActivision);
router.route("/logOut").post(userLoOut);
router.route("/register").post(userRegistration);
// router.route("/active/:token").get(userAccountActivision);

router.route("/me").get(tokenVerify, loggedInUser);

//export
export default router;
