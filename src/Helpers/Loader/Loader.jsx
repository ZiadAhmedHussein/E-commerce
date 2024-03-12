import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import style from "./Loader.module.css";

function Loader() {
  return (
    <div
      className={`${style.loader} z-3  vh-100 w-100 position-fixed d-flex align-items-center justify-content-center top-0  start-0`}
    >
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass="justify-content-center py-5 my-5"
      />
    </div>
  );
}

export default Loader;
