import React from "react";
import "../styles/Combobox.css";

const Combobox = ({ title }) => {
  return (
    <div className="combobox">
      <select>
        <option>{title}</option>
      </select>
    </div>
  );
};

export default Combobox;
