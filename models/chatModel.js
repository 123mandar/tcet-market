import mongoose from "mongoose";

// Define the message schema
const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // sender is now a reference to User
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Define the chat schema
const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // All users are participants
    messages: [messageSchema], // Embed message schema
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
