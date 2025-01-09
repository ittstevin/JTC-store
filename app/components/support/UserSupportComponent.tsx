"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './UserSupportComponent.css';

const UserSupportComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on('connect', () => {
      console.log(`Connected as user: ${socket.id}`);
    });

    socket.on('receive-message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      user: "User",
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prevMessages => [...prevMessages, message]);
    socket.emit('send-message', message, room);
    setNewMessage("");
  };

  return (
    <div className="support-container">
      <h2>User Support Chat</h2>
      <div id="message-container" className="message-container">
        {messages.map((msg, idx) => (
          <div className="message" key={idx}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="message-form">
        <input
          type="text"
          placeholder="Type your message..."
          className="input-field"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default UserSupportComponent;
