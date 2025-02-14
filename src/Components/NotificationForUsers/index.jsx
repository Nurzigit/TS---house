import React, { useEffect, useState } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import AdditionalHeader from "../AdditionalHeader";
import "./styles/style.css";

export const NotificationForUser = ({ user }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await fetch("http://localhost:8000/api/messages");
    const data = await response.json();
    setMessages(data);
  };

  return (
    <div className="notification-forUser ">
      <div className="notification-forUser__header">
        <Header user={user} />
      </div>
      <div className="notification-forUser__main">
        <AdditionalHeader user={user} messages={messages} />
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message._id} className="message-item">
              <img
                src={`http://localhost:8000/${message.image}`}
                alt={message.title}
              />
              <h3>{message.title}</h3>
              <p>{message.description}</p>
            </div>
          ))}
        </div>
        <Footer user={user} />
      </div>
    </div>
  );
};
