"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './AdminSupportComponent.css'; // Import the CSS file

const AdminSupportComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:4000");
    const adminSocket = io("http://localhost:4000/user");

    socket.on('connect', () => {
      console.log(`Admin connected with ID: ${socket.id}`);
    });

    adminSocket.on('receive-message', (message) => {
      displayMessage(message);
    });

    return () => {
      socket.disconnect();
      adminSocket.disconnect();
    };
  }, []);

  const displayMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      user: "Admin", // Replace with actual admin name if needed
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    displayMessage(message);
    // Emit the message to the specific user or room if needed
    // socket.emit('send-message', message, selectedRoom);

    setNewMessage(""); // Clear input after sending
  };

  return (
    <div className="admin-support-container">
      <h2>Admin Support Chat</h2>
      <div id="message-container" className="message-container">
        {messages.map((message, index) => (
          <div className="message" key={index}>
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="message-form">
        <input
          type="text"
          placeholder="Type your reply..."
          className="input-field"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default AdminSupportComponent;
