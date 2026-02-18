import React, { useEffect, useMemo, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { io } from "socket.io-client";
import Layout from "../components/Layout/Layout";
import CurvedBackground from "../components/Layout/CurvedBackground";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const authData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("auth")) || {};
    } catch (error) {
      return {};
    }
  }, []);

  const token = authData?.token;
  const currentUserEmail = authData?.user?.email;

  const socket = useMemo(
    () =>
      io(`${process.env.REACT_APP_API_URL}`, {
        transports: ["websocket"],
      }),
    []
  );

  useEffect(() => {
    if (!token) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/chats/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [token]);

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("chatMessage");
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = async () => {
    if (!token || !newMessage.trim() || isSending) return;

    try {
      setIsSending(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/chats/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
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
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    message: {
      maxWidth: "85%",
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "10px",
      fontSize: "1rem",
      lineHeight: "1.4",
      backgroundColor: "#f1f1f1",
      alignSelf: "flex-start",
    },
    ownMessage: {
      backgroundColor: "#e0f7fa",
      alignSelf: "flex-end",
    },
    sender: {
      fontSize: "0.8rem",
      marginBottom: "4px",
      fontWeight: 600,
      color: "#444",
    },
    timestamp: {
      display: "block",
      fontSize: "0.75rem",
      color: "#888",
      marginTop: "6px",
      textAlign: "right",
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
      opacity: isSending ? 0.7 : 1,
    },
  };

  return (
    <>
      <CurvedBackground />
      <Layout>
        <div style={styles.container}>
          <div style={styles.header}>
            <h4>Community Chat</h4>
          </div>
          <div style={styles.body}>
            {!token ? (
              <p>Please login to access the Community Hub.</p>
            ) : messages.length > 0 ? (
              messages.map((msg, idx) => {
                const isOwnMessage =
                  currentUserEmail &&
                  msg.senderEmail &&
                  msg.senderEmail === currentUserEmail;

                return (
                  <div
                    key={msg._id || idx}
                    style={
                      isOwnMessage
                        ? { ...styles.message, ...styles.ownMessage }
                        : styles.message
                    }
                  >
                    <p style={styles.sender}>{msg.senderName || "User"}</p>
                    <p>{msg.content}</p>
                    <span style={styles.timestamp}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                );
              })
            ) : (
              <p>No messages yet. Start the conversation 👋</p>
            )}
          </div>

          <div style={styles.footer}>
            <textarea
              style={styles.textarea}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={token ? "Type your message..." : "Login to chat"}
              disabled={!token}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              style={styles.button}
              onClick={sendMessage}
              disabled={!token || isSending}
              title={!token ? "Login required" : "Send message"}
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
