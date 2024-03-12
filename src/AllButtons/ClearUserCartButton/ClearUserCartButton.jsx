import React from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
// import style from "./ClearUserCartButton.module.css";

const ClearUserCartButton = (props) => {
  const { clearCart, isLoading } = useContext(CartContext);
  let navigate = useNavigate();

  async function clearUserCart() {
    let res = await clearCart();
    props.onUpdatedData(res);
    navigate("/home");
  }

  return (
    <>
      <button
        onClick={clearUserCart}
        className=" fw-bold btn btn-danger text-white mx-auto d-block mx-md-0"
      >
        {isLoading ? (
          <i className="fa-solid fa-spinner fa-spin "></i>
        ) : (
          "Clear Cart"
        )}
      </button>
    </>
  );
};

export default ClearUserCartButton;
