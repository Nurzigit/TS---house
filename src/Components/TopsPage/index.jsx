import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import AdditionalHeader from "../AdditionalHeader";
import "./styles/style.css"


export const TopsPage = ({ user }) => {
  return (
    <div className="tops-page">
      <div className="tops-page__header">
        <Header user={user} />
      </div>
      <div className="tops-page__main">
      <AdditionalHeader user={user} />
        <h1>Hello tops pages</h1>
        <Footer user={user} />
      </div>
    </div>
  );
};
