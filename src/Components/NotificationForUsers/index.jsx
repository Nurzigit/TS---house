import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useNotifications } from "../../context/NotificationContext";
import AdditionalHeader from "../AdditionalHeader";
import "./styles/style.css";

export const NotificationForUser = ({ user }) => {

  const { messages } = useNotifications();

  return (
    <div className="notification-forUser ">
      <div className="notification-forUser__header">
        <Header user={user} />
      </div>
      <div className="notification-forUser__main">
        <AdditionalHeader user={user} />
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
