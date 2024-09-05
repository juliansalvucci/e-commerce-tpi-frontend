import React from "react";
import "../styles/Navbar.css";
import SearchBar from "./SearchBar";
import User from "./User";
import Cart from "./Cart";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Logo />
      <SearchBar />
      <User />
      <Cart />
    </nav>
  );
};

export default Navbar;
