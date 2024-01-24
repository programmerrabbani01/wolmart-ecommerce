import express from "express";

import tokenVerify from "../middlewares/verifyToken.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  updateProductStatus,
} from "../controller/productController.js";
import { productMulter } from "../utils/multer.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllProduct).post(productMulter, createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .patch(productMulter, updateProduct)
  .put(productMulter, updateProduct);

router.route("/status/:id").put(updateProductStatus);

// export router

export default router;
