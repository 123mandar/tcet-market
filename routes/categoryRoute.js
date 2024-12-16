import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  createCategoryController,
  delCategoryController,
  getCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// Route to create a new category
// Requires user to be signed in and have admin privileges
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  formidable(),
  createCategoryController
);

// Route to update an existing category by ID
// Requires user to be signed in and have admin privileges
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Route to get all categories
// Open to all users, no sign-in required
router.get("/get-category", getCategoryController);
// Route to get a single category by its slug
// Open to all users, no sign-in required
router.get("/get-single-category/:slug", getSingleCategoryController);

// Route to delete a category by ID
// Requires user to be signed in and have admin privileges
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  delCategoryController
);

export default router;
