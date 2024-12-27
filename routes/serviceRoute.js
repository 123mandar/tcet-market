import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createServiceController,
  deleteServiceController,
  getServiceController,
  getSingleServiceController,
  getUserServicesController,
  servicePhotoController,
} from "../controllers/serviceController.js";
import formidable from "express-formidable";

const router = express.Router();

// Routes for Services
router.post(
  "/create-service",
  requireSignIn,
  formidable(),
  createServiceController
);

router.get("/get-services", getServiceController);

router.get("/get-service/:slug", getSingleServiceController);

router.get("/get-service-photo/:sid", servicePhotoController);

router.delete("/delete-service/:sid", requireSignIn, deleteServiceController);

router.get("/seller-services", requireSignIn, getUserServicesController);

export default router;
