import React, { useContext } from "react";
import style from "./Layout.module.css";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loader from "../../Helpers/Loader/Loader";
import { CartContext } from "../../Context/CartContext";

const Layout = () => {
  const { isLoading } = useContext(CartContext);
  return (
    <div className=" position-relative">
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={`${style.layout} container `}>
            <Outlet />
          </div>
          <Toaster />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Layout;
