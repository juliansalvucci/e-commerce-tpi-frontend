import React from "react";
import "../styles/SearchBar.css";

function SearchBar() {
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") {
        alert("Debes ingresar algo para buscar");
      } else {
        console.log("Buscar: ", e.target.value);
      }
    }
  };
  return (
    <>
      <div className=".search-bar">
        <input type="text" placeholder="Que quieres buscar?" onKeyUp={onKeyPress} />
      </div>
    </>
  );
}

export default SearchBar;
