import React from "react";
import SearchBar from "../components/SearchBar";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <>
      <div >
        <Logo />
        <div><SearchBar style={{ marginLeft: "1em" }} /></div>
      </div>
    </>
  );
};

export default Home;
