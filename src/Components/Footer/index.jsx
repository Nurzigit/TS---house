import React from "react";

export const Footer = ({user}) => {
    return(
        <>
            <h1>It's footer {user.nickname}, {user.role}</h1>
        </>
    );
}