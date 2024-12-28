import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { io } from "socket.io-client";
import Layout from "../components/Layout/Layout";
import CurvedBackground from "../components/Layout/CurvedBackground";

// Connect to the Socket.IO server
const socket = io(`${process.env.REACT_APP_API_URL}`);

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch initial messages from the backend
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/chats/messages`
        );
        const data = await response.json();
        if (data.success) {
          setMessages(data.messages);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Listen for real-time messages from Socket.IO
    socket.on("chatMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = { content: newMessage };
      socket.emit("chatMessage", message); // Emit message to server
      setNewMessage(""); // Clear input field
    }
  };

  const styles = {
    container: {
      width: "90%",
      maxWidth: "800px",
      margin: "20px auto",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      height: "80vh",
    },
    header: {
      backgroundColor: "#dda92f",
      color: "white",
      padding: "15px",
      textAlign: "center",
      fontSize: "1.2rem",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
    },
    body: {
      flexGrow: 1,
      padding: "15px",
      overflowY: "auto",
      backgroundColor: "#f9f9f9",
      borderBottom: "1px solid #ddd",
    },
    message: {
      maxWidth: "80%",
      marginBottom: "15px",
      padding: "10px",
      borderRadius: "10px",
      fontSize: "1rem",
      lineHeight: "1.5",
      position: "relative",
      backgroundColor: "#f1f1f1",
      alignSelf: "flex-start",
    },
    buyerMessage: {
      backgroundColor: "#e0f7fa",
      alignSelf: "flex-end",
    },
    timestamp: {
      fontSize: "0.8rem",
      color: "#888",
      position: "absolute",
      bottom: "5px",
      right: "10px",
    },
    footer: {
      padding: "10px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f1f1f1",
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
    },
    textarea: {
      flexGrow: 1,
      padding: "10px",
      resize: "none",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      backgroundColor: "#fff",
    },
    button: {
      backgroundColor: "#dda92f",
      border: "none",
      padding: "10px",
      color: "white",
      cursor: "pointer",
      marginLeft: "10px",
      borderRadius: "5px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    responsive: {
      "@media (max-width: 768px)": {
        header: { fontSize: "1rem", padding: "10px" },
        textarea: { fontSize: "0.9rem", padding: "8px" },
        button: { padding: "8px", marginLeft: "5px" },
      },
      "@media (max-width: 480px)": {
        container: { width: "100%", height: "85vh" },
        textarea: { fontSize: "0.8rem" },
        message: { fontSize: "0.9rem" },
      },
    },
  };

  return (
    <>
      <CurvedBackground />
      <Layout>
        <div style={{ ...styles.container, ...styles.responsive.container }}>
          <div style={{ ...styles.header, ...styles.responsive.header }}>
            <h4>Community Chat</h4>
          </div>
          <div style={styles.body}>
            {messages && messages.length > 0 ? (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={
                    msg.isBuyer
                      ? { ...styles.message, ...styles.buyerMessage }
                      : styles.message
                  }
                >
                  <p>{msg.content}</p>
                  <span style={styles.timestamp}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <p>No messages yet.</p>
            )}
          </div>
          <div style={styles.footer}>
            <textarea
              style={{ ...styles.textarea, ...styles.responsive.textarea }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              style={{ ...styles.button, ...styles.responsive.button }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.buttonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.button.backgroundColor)
              }
              onClick={sendMessage}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ChatPage;
