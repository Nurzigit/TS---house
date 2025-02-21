import React, { useState } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useNotifications } from "../../context/NotificationContext";
import AdditionalHeader from "../AdditionalHeader";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import "./styles/style.css";


export const NotificationForUser = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();
  const { messages, isLoading } = useNotifications();

  const filteredMessages = messages
    .filter((message) =>
      message.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((message) =>
      selectedLetter
        ? message.title.toLowerCase().startsWith(selectedLetter)
        : true
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="notification-page">
      {isLoading && <Loader />}
      <div className="notification-page__header">
        <Header user={user} />
      </div>
      <div className="notification-page__main">
        <AdditionalHeader user={user} messages={messages} />
        <div className="notification-page__main-inner">
          <h1 className="notification-page__title">Messages for all users</h1>
          {/* Поле поиска */}
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="notification-search"
          />

          {/* Фильтрация по первой букве */}
          <select
            value={selectedLetter}
            onChange={(e) => setSelectedLetter(e.target.value)}
            className="notification-filter"
          >
            <option value="">All Letters</option>
            {[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((letter) => (
              <option key={letter} value={letter.toLowerCase()}>
                {letter}
              </option>
            ))}
          </select>

          {/* Сортировка по дате */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="notification-sort"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <div className="messages-list">
          {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <div
                  key={message._id}
                  className="message-item"
                  onClick={() => navigate(`/notifyforusers/${message._id}`)}
                >
                  <h3>{message.title}</h3>
                  <p>{message.description.slice(0, 100)}...</p>
                  <span className="message-date">
                    {new Date(message.date).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="no-results">No messages found</p>
            )}
          </div>
        </div>
        <div className="notification-page__main-footer">
          <Footer user={user} />
        </div>
      </div>
    </div>
  );
};
