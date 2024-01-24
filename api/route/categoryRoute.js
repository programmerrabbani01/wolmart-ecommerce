import express from "express";

import tokenVerify from "../middlewares/verifyToken.js";

// import { CategoryMulter } from "../utils/multer.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  updateCategoryStatus,
} from "../controller/categoryController.js";
import { categoryMulter } from "../utils/multer.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllCategory).post(categoryMulter, createCategory);

router
  .route("/:id")
  .get(getSingleCategory)
  .delete(deleteCategory)
  .patch(categoryMulter, updateCategory)
  .put(categoryMulter, updateCategory);

router.route("/status/:id").put(updateCategoryStatus);

// export router

export default router;
