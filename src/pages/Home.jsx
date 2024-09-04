import React from "react";
import SearchBar from "../components/SearchBar";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Logo />
        <SearchBar style={{ marginLeft: "1em" }} />
      </div>
    </>
  );
};

export default Home;
