import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import AdditionalHeader from "../AdditionalHeader";
import "./styles/style.css";


export const Notification = ({ user }) => {
  return (
    <div className="notification-page">
      <div className="notification-page__header">
        <Header user={user}/>
      </div>
      <div className="notification-page__main">
        <AdditionalHeader user={user}/>
        <div className="notification-page__main-inner">
          <h1>Messages for all users</h1>
        </div>
        <div className="notification-page__main-footer">
          <Footer user={user}/>
        </div>
      </div>
    </div>
  );
};
