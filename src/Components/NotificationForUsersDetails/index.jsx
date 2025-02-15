import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useParams } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { Link } from "react-router-dom";
import "./styles/style.css";

export const NotificationDetail = ({ user }) => {
  const { messageId } = useParams();
  const { messages } = useNotifications();
  const message = messages.find((msg) => msg._id === messageId);

  if (!message) {
    return <h2>Message not found</h2>;
  }

  return (
    <div className="notification-page">
      <div className="notification-page__header">
        <Header user={user} />
      </div>
      <div className="notification-page__main">
        <Link to="/notifyforusers" className="back-link">
          Back
        </Link>
        <h1 className="notification-page__title">{message.title}</h1>
        <img
          src={`http://localhost:8000/${message.image}`}
          alt={message.title}
          className="message-detail__image"
        />
        <p className="message-detail__description">{message.description}</p>
      </div>
      <div className="notification-page__main-footer">
        <Footer user={user} />
      </div>
    </div>
  );
};
