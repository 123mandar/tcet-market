import Chat from "../models/chatModel.js";

// Get messages for the community chat
export const getMessagesController = async (req, res) => {
  try {
    const chat = await Chat.findOne(); // Find the community chat (or use a specific chat ID)
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }
    res.status(200).json({ success: true, messages: chat.messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Send a message in the community chat
export const sendMessageController = async (req, res) => {
  try {
    const { content } = req.body;
    const { userId } = req; // Assuming the user ID is available from middleware

    const chat = await Chat.findOne(); // Find the community chat
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    const newMessage = {
      content,
      sender: userId, // Set the sender to the logged-in user
      timestamp: new Date(),
    };

    chat.messages.push(newMessage); // Push the new message to the messages array
    await chat.save(); // Save the chat with the new message

    const io = req.app.get("io");
    io.emit("chatMessage", newMessage); // Broadcast to all connected clients

    res.status(200).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
