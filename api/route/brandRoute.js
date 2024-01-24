import express from "express";

import tokenVerify from "../middlewares/verifyToken.js";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
  updateBrandStatus,
} from "../controller/brandController.js";
import { brandMulter } from "../utils/multer.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllBrand).post(brandMulter, createBrand);

router
  .route("/:id")
  .get(getSingleBrand)
  .delete(deleteBrand)
  .patch(brandMulter, updateBrand)
  .put(brandMulter, updateBrand);

router.route("/status/:id").put(updateBrandStatus);

// export router

export default router;
