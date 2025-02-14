import React, { useState } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import AdditionalHeader from "../AdditionalHeader";
import { useNotifications } from "../../context/NotificationContext";
import "./styles/style.css";

export const Notification = ({ user }) => {
  const { messages, addNewMessage, updateExistingMessage, removeMessage } =
    useNotifications();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    if (editingMessage) {
      updateExistingMessage(editingMessage._id, formData);
      setEditingMessage(null);
    } else {
      addNewMessage(formData);
    }

    setImage(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="notification-page">
      <div className="notification-page__header">
        <Header user={user} />
      </div>
      <div className="notification-page__main">
        <AdditionalHeader user={user} messages={messages} />
        <div className="notification-page__main-inner">
          <h1 className="notification-page__title">Messages for all users</h1>
          <form className="notification-page__form" onSubmit={handleSubmit}>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <button type="submit">
              {editingMessage ? "Update Message" : "Add Message"}
            </button>
          </form>
          <div className="messages-list">
            {messages.map((message) => (
              <div key={message._id} className="message-item">
                <img
                  src={`http://localhost:8000/${message.image}`}
                  alt={message.title}
                />
                <h3>{message.title}</h3>
                <p>{message.description}</p>
                {user.role === "admin" && (
                  <div>
                    <button onClick={() => setEditingMessage(message)}>
                      Edit
                    </button>
                    <button onClick={() => removeMessage(message._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="notification-page__main-footer">
          <Footer user={user} />
        </div>
      </div>
    </div>
  );
};
