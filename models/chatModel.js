import mongoose from "mongoose";

// Define the message schema
const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderName: { type: String, required: true, trim: true },
    senderEmail: { type: String, required: true, trim: true, lowercase: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: true }
);

// Define the chat schema
const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
