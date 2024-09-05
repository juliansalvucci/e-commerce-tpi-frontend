import React from "react";
import "../styles/User.css";

const User = () => {
  const user = "guest";
  return (
    <>
      <div>
        {/* Aca iría el ícono del usuario, por ahora "iUser" para ilustrar */}
        <span className=".user-logo">iUser</span>
      </div>
      <div className=".user-section">
        <span className=".user-greeting">Hello, {user}</span>
        <div className=".user-links">
          <a href="/login" className=".user-link">
            Log in
          </a>
          <span>|</span>
          <a href="/register" className=".user-link">
            Register
          </a>
        </div>
      </div>
    </>
  );
};

export default User;
