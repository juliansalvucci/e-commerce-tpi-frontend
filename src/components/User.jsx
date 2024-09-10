import React from "react";
import "../styles/User.css";

const User = () => {
  const user = "guest"; /* Hack temporal para que funcione el componente */
  return (
    <>
      <div className="user-section">
        {/* Aca iría la imagen del logo del usuario
        <div className="user-logo">
        <img src={} alt={} className="" /> 
        </div>
        */}
        <button type="button" className="user-logo">
          👤
        </button>
        <span className="user-greeting">Hello, {user}</span>
      </div>
    </>
  );
};

export default User;
