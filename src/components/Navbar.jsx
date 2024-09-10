import React from "react";
import "../styles/Navbar.css";
import SearchBar from "./SearchBar";
import User from "./User";
import Cart from "./Cart";
import Logo from "./Logo";
import Combobox from "./Combobox";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Logo />
      <div className="combobox-container">
        <Combobox title="Categories" />
        <Combobox title="Promotions" />
        <Combobox title="Help" />
        <Combobox title="About" />
      </div>
      <SearchBar />
      <Cart />
      <User />
    </nav>
  );
};

export default Navbar;
