// routes/contactRoute.js
import express from "express";
import { submitContactFormController } from "../controllers/contactController.js"; // Import the controller

const router = express.Router();

// POST route for submitting contact data
router.post("/", submitContactFormController);

export default router;
