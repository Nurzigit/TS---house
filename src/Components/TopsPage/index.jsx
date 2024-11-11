import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
export const TopsPage = ({user}) => {
  return (
    <>
      <Header user={user} />
        <h1>Hello tops pages</h1>
      <Footer user={user} />
    </>
  );
};
