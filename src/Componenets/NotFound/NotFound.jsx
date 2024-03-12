import React from "react";
import style from "./NotFound.module.css";
import err404 from "../../Assets/Images/error404.svg";

const NotFound = () => {
  return (
    <>
      <div
        className={` d-flex justify-content-center align-items-center w-50 mx-auto my-5 `}
      >
        <img className="w-100" src={err404} alt="Error 404 Image" />
      </div>
    </>
  );
};

export default NotFound;
