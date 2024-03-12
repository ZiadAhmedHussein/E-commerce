import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

import { WishListContext } from "../../Context/WishListContext/WishListContext";
import Loader from "../../Helpers/Loader/Loader";

// import style from "./AddToCartButton.module.css";

let AddToCartButton = (props) => {
  let { isLoadingCart, addToCart } = useContext(CartContext);
  let { isLoading, RemoveItemFromWish } = useContext(WishListContext);

  async function clickToAddProductToCart(id) {
    await addToCart(id);
  }

  return (
    <>
      {isLoading || isLoadingCart ? <Loader /> : null}
      <button
        onClick={() => {
          clickToAddProductToCart(props.productId);

          if (
            localStorage
              .getItem("wishList")
              ?.split(",")
              .includes(props.productId)
          ) {
            RemoveItemFromWish(props.productId);
          }
        }}
        className="btn bg-main text-white w-100"
      >
        Add To Cart
      </button>
    </>
  );
};

export default AddToCartButton;
