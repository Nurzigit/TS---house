import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/style.css";

export const Header = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__inner-logo">
          <Link to="/main">
            <li className="logo">
              <div className="header__inner-logo-img">
                <img src="/Images/Header/bg_ts_house.png" alt="" />
                <span>TS_HOUSE</span>
              </div>
              <div className="mobile_logo">
                <img src="/Images/Header/bg_ts_house.png" alt="" />
              </div>
            </li>
          </Link>
        </div>
        <div className="header__inner-links">
          <Link to="/main">
            <li className="link">
              <img className="link_icon" src="/Images/Header/home.png" alt="" />
              <span>Домашняя страница</span>
            </li>
          </Link>
          <Link to="/favorites">
            <li className="link">
              <img
                className="link_icon"
                src="/Images/Header/heart.svg"
                alt=""
              />
              <span>Избранное</span>
            </li>
          </Link>
          <Link to="/top">
            <li className="link">
              <img
                className="link_icon"
                src="/Images/Header/trending-up.svg"
                alt=""
              />
              <span>Топе</span>
            </li>
          </Link>
          <Link to="/settling">
            <li className="link">
              <img
                className="link_icon"
                src="/Images/Header/bunk-2.png"
                alt=""
              />
              <span>Заселение</span>
            </li>
          </Link>
          <Link to="/community">
            <li className="link">
              <img
                className="link_icon"
                src="/Images/Header/message-circle.svg"
                alt=""
              />
              <span>Сообщество</span>
            </li>
          </Link>
          {(user.role === "admin" || user.role === "advertiser") && (
            <Link to="/add">
              <li className="link">
                <img
                  className="link_icon"
                  src="/Images/Header/add.png"
                  alt=""
                />
                <span>Добавление</span>
              </li>
            </Link>
          )}
          {user.role === "admin" && (
            <Link to="/notify">
              <li className="link">
                <img
                  className="link_icon"
                  src="/Images/Header/mail.png"
                  alt=""
                />
                <span>Отправить сообщение</span>
              </li>
            </Link>
          )}
        </div>
      </div>
      <div className="header__need-btns">
        <Link to="/settings">
          <li className="link">
            <img
              className="link_icon"
              src="/Images/Header/sliders.svg"
              alt=""
            />
            <span>Настройки</span>
          </li>
        </Link>
        <li className="link_logout">
          <img
            onClick={handleLogout}
            className="link_icon"
            src="/Images/Header/logout.png"
            alt=""
          />
          <span onClick={handleLogout}>Logout</span>
        </li>
      </div>
    </header>
  );
};
