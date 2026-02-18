import Chat from "../models/chatModel.js";
import userModel from "../models/userModel.js";

const getOrCreateCommunityChat = async () => {
  let chat = await Chat.findOne();
  if (!chat) {
    chat = await Chat.create({ participants: [], messages: [] });
  }
  return chat;
};

// Get messages for the community chat
export const getMessagesController = async (req, res) => {
  try {
    const chat = await getOrCreateCommunityChat();

    const messages = chat.messages.map((message) => ({
      _id: message._id,
      content: message.content,
      sender: message.sender,
      senderName: message.senderName || "User",
      senderEmail: message.senderEmail || "",
      timestamp: message.timestamp,
    }));

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Send a message in the community chat
export const sendMessageController = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user?._id;

    if (!content || !content.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Message content is required" });
    }

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const sender = await userModel.findById(userId).select("name email");
    if (!sender) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const chat = await getOrCreateCommunityChat();

    const newMessage = {
      content: content.trim(),
      sender: userId,
      senderName: sender.name,
      senderEmail: sender.email,
      timestamp: new Date(),
    };

    chat.messages.push(newMessage);

    if (!chat.participants.some((participantId) => participantId.equals(userId))) {
      chat.participants.push(userId);
    }

    await chat.save();

    const savedMessage = chat.messages[chat.messages.length - 1];
    const outgoingMessage = {
      _id: savedMessage._id,
      content: savedMessage.content,
      sender: savedMessage.sender,
      senderName: savedMessage.senderName,
      senderEmail: savedMessage.senderEmail,
      timestamp: savedMessage.timestamp,
    };

    const io = req.app.get("io");
    if (io) {
      io.emit("chatMessage", outgoingMessage);
    }

    res.status(200).json({ success: true, message: outgoingMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
