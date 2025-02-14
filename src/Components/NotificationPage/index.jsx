import React, { useState, useEffect } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import AdditionalHeader from "../AdditionalHeader";
import "./styles/style.css";

export const Notification = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await fetch("http://localhost:8000/api/messages");
    const data = await response.json();
    setMessages(data);
  };

  const handleAddMessage = async (e) => {
    e.preventDefault();

    if (user.role !== "admin") {
      alert("Only admin can add messages");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch("http://localhost:8000/api/messages/add", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.role}`, // Передаем роль как Bearer-токен
      },
    });

    if (response.ok) {
      alert("Message added successfully");
      setImage(null);
      setTitle("");
      setDescription("");
      fetchMessages();
    } else {
      alert("Error adding message");
    }
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setTitle(message.title);
    setDescription(message.description);
  };

  const handleUpdateMessage = async (e) => {
    e.preventDefault();

    if (user.role !== "admin") {
      alert("Only admin can update messages");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch(
      `http://localhost:8000/api/messages/${editingMessage._id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.role}`,
        },
      }
    );

    if (response.ok) {
      alert("Message updated successfully");
      setEditingMessage(null);
      setImage(null);
      setTitle("");
      setDescription("");
      fetchMessages();
    } else {
      alert("Error updating message");
    }
  };

  const handleDeleteMessage = async (id) => {
    if (user.role !== "admin") {
      alert("Only admin can delete messages");
      return;
    }

    const response = await fetch(`http://localhost:8000/api/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.role}`,
      },
    });

    if (response.ok) {
      alert("Message deleted successfully");
      fetchMessages();
    } else {
      alert("Error deleting message");
    }
  };

  return (
    <div className="notification-page">
      <div className="notification-page__header">
        <Header user={user} />
      </div>
      <div className="notification-page__main">
        <AdditionalHeader user={user} />
        <div className="notification-page__main-inner">
          <h1>Messages for all users</h1>
          <form
            onSubmit={editingMessage ? handleUpdateMessage : handleAddMessage}
          >
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              placeholder="Image URL"
            />
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
                    <button onClick={() => handleEditMessage(message)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteMessage(message._id)}>
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
