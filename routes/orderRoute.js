import express from "express";
import {
  createOrderController,
  getSellerOrdersController,
  deleteOrderController,
  verifyPaymentController,
  getAllOrdersController,
} from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a Razorpay order
router.post("/create-order", requireSignIn, createOrderController);

// Verify Razorpay payment
router.post("/verify-payment", requireSignIn, verifyPaymentController);

// Fetch seller orders
router.get("/seller-orders", requireSignIn, getSellerOrdersController);

router.get("/manage-order", requireSignIn, isAdmin, getAllOrdersController);

// Delete an order
router.delete("/delete-order/:orderId", requireSignIn, deleteOrderController);

export default router;
