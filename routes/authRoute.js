// Import necessary modules and controllers
import {
  registerController,
  loginController,
  testController,
  googleLoginController,
} from "../controllers/authController.js";
import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";

// Initialize the router
const router = express.Router();

// Define authentication routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requireSignIn, isAdmin, testController);
router.post("/google-login", googleLoginController);

// Protected routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Export the router
export default router;
