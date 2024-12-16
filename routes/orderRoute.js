import express from "express";
import {
  createOrderController,
  getSellerOrdersController,
  deleteOrderController,
  verifyPaymentController,
} from "../controllers/orderController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a Razorpay order
router.post("/create-order", requireSignIn, createOrderController);

// Verify Razorpay payment
router.post("/verify-payment", requireSignIn, verifyPaymentController);

// Fetch seller orders
router.get("/seller-orders", requireSignIn, getSellerOrdersController);

// Delete an order
router.delete("/delete-order/:orderId", requireSignIn, deleteOrderController);

export default router;
