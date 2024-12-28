import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getMessagesController,
  sendMessageController,
} from "../controllers/chatController.js";

const router = express.Router();

// Route to fetch all messages for a specific chat
router.get("/:chatId/messages", requireSignIn, getMessagesController);

// Route to send a new message to a specific chat
router.post("/:chatId/messages", requireSignIn, sendMessageController);

export default router;
