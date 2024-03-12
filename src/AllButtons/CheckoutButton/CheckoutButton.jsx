import React, { useContext } from "react";
// import style from "./CheckoutButton.module.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

const CheckoutButton = () => {
  let { numbersOfCartItems } = useContext(CartContext);
  return (
    <>
      <Link
        className={`${
          numbersOfCartItems === "0" ? "disabled" : ""
        } btn bg-main w-100 text-white mt-3`}
        to={"/checkoutForm"}
      >
        Checkout
      </Link>
    </>
  );
};

export default CheckoutButton;
