import express from "express";

import tokenVerify from "../middlewares/verifyToken.js";
import {
  createTag,
  deleteTag,
  getAllTag,
  getSingleTag,
  updateTag,
  updateTagStatus,
} from "../controller/tagController.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllTag).post(createTag);

router.route("/:id").get(getSingleTag).delete(deleteTag).patch(updateTag);

router.route("/status/:id").put(updateTagStatus);

// export router

export default router;
