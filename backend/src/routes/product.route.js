import { Router } from "express";
import { addProductValidation } from "../middlewares/productValidation.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  searchProduct,
} from "../controllers/product.cotroller.js";

const productRouter = Router();

productRouter
  .route("/add-product")
  .post(verifyJWT, addProductValidation, addProduct);

productRouter.route("/get-all-product").get(verifyJWT, getAllProducts);
productRouter.route("/search-product").get(verifyJWT, searchProduct);
productRouter.route("/delete-product/:id").post(verifyJWT, searchProduct);

export default productRouter;
