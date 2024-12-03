import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import "./styles/style.css";
const AdditionalHeader = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      setNotifications([
        "Новое сообщение от друга",
        "Обновление в вашем избранном",
        "Новое событие в сообществе",
        "Новое событие в сообществе",
        "Новое событие в сообществе",
      ]);
    };
    fetchNotifications();
  }, []);
  return (
    <div className="user-info">
      <div className="user-info__inner">
        <input
          type="text"
          placeholder="Поиск..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="notifications">
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
          {/* <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif}</li>
        ))}
      </ul> */}
        </div>
        <div className="user">
          <img
            className="user_photo"
            src="/Images/Header/images-4.jpeg"
            alt=""
          />
          <span>
            {user.nickname} {user.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalHeader;
