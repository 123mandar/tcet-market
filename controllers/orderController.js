import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay order and save it in DB
export const createOrderController = async (req, res) => {
  try {
    const { productId } = req.body;
    const buyerId = req.user._id;

    const product = await productModel.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const amount = product.price * 100; // Amount in paise

    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    const newOrder = new orderModel({
      product: product._id,
      buyer: buyerId,
      seller: product.sellerId,
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created",
      razorpayOrderId: razorpayOrder.id,
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Verify Razorpay payment signature
export const verifyPaymentController = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const hash = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (hash !== razorpaySignature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to verify payment" });
  }
};

// Fetch orders and calculate total sales for the seller (no status check)
export const getSellerOrdersController = async (req, res) => {
  try {
    const sellerId = req.user._id; // Extract seller ID from token

    // Fetch the orders with populated buyer and product details
    const orders = await orderModel
      .find({ seller: sellerId })
      .populate("buyer", "name email phone")
      .populate("product", "name price");

    // Calculate total sales by summing up the price of all orders
    const totalSales = orders.reduce((acc, order) => {
      // Ensure the price is treated as a number, not a string
      acc += Number(order.product.price); // Convert to number if necessary
      return acc;
    }, 0);

    res.status(200).json({ success: true, orders, totalSales });
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Fetch orders
export const getAllOrdersController = async (req, res) => {
  try {
    // Fetch all orders with populated buyer, seller, and product details
    const orders = await orderModel
      .find({})
      .populate("buyer", "name email phone") // Populate buyer details
      .populate("seller", "name email") // Populate seller details
      .populate("product", "name price category"); // Populate product details

    // Calculate total sales by summing up the price of all orders
    const totalSales = orders.reduce((acc, order) => {
      acc += Number(order.product.price); // Convert price to a number if necessary
      return acc;
    }, 0);

    res.status(200).json({ success: true, orders, totalSales });
  } catch (error) {
    console.error("Error fetching all orders for admin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete an order
export const deleteOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    await orderModel.findByIdAndDelete(orderId);
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error); // More detailed logging
    res.status(500).json({ success: false, message: "Failed to delete order" });
  }
};
