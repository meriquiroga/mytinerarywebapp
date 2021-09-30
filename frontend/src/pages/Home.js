import React from "react";
import Main from "../components/Main";
import MyCarousel from "../components/MyCarousel";

const Home = () => {
  return (
    <>
      <div className="contenedor">
        <Main title="Popular MYtineraries" />
        <MyCarousel />
      </div>
    </>
  );
};

export default Home;
