import express from "express";
import {
  getVisitorCountController,
  incrementVisitorCountController,
  initializeVisitorCountController,
} from "../controllers/visitorController.js";

const router = express.Router();
// Initialize visitor count'
router.post("/initialize", initializeVisitorCountController);

// Increment visitor count
router.post("/increment", incrementVisitorCountController);

// Get current visitor count
router.get("/count", getVisitorCountController);

export default router;
