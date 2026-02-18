import express from "express";
import {
  getMessagesController,
  sendMessageController,
} from "../controllers/chatController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Community hub routes (single shared room)
router.get("/messages", requireSignIn, getMessagesController);
router.post("/messages", requireSignIn, sendMessageController);

export default router;
