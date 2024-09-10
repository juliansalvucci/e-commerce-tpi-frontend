import React from "react";
import "../styles/SearchBar.css";

function SearchBar() {
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") {
        alert("Debes ingresar algo para buscar");
      } else {
        /* Aca iría la lógica de búsqueda del producto */
        console.log("Buscar: ", e.target.value);
      }
    }
  };
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          onKeyUp={onKeyPress}
        />
        {/* Aca iría la imagen de la lupita
         <img src={} alt={} /> */}
      </div>
    </>
  );
}

export default SearchBar;
