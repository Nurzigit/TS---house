import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import "./styles/style.css";

const AdditionalHeader = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch("http://localhost:8000/api/messages");
      const data = await response.json();
      setNotifications(data);
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
          <Link to="/notifyforusers">
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </Link>

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
