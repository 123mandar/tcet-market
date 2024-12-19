import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createRentProductController,
  deleteRentProductController,
  getRentProductController,
  getSingleRentProductController,
  getUserRentProductsController,
  rentProductPhotoController,
  updateRentProductController,
} from "../controllers/rentProductController.js";
import formidable from "express-formidable";

const router = express.Router();

// Routes for Rent Products
router.post(
  "/create-rent-product",
  requireSignIn,
  formidable(),
  createRentProductController
);

router.get("/get-rent-products", getRentProductController);

router.get("/get-rent-product/:slug", getSingleRentProductController);

router.get("/get-rent-product-photo/:pid", rentProductPhotoController);

router.delete(
  "/delete-rent-product/:pid",
  requireSignIn,
  deleteRentProductController
);

router.put(
  "/update-rent-product/:pid",
  requireSignIn,
  formidable(),
  updateRentProductController
);

router.get(
  "/seller-rent-products",
  requireSignIn,
  getUserRentProductsController
);

export default router;
