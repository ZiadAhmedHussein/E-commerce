import React, { useContext } from "react";
// import style from "./RemoveItemFromWishListButton.module.css";
import Loader from "../../Helpers/Loader/Loader";
import { WishListContext } from "../../Context/WishListContext/WishListContext";

const RemoveItemFromWishListButton = (props) => {
  const { isLoading, RemoveItemFromWish } = useContext(WishListContext);

  async function RemoveItemFromWishs(id) {
    await RemoveItemFromWish(id);
  }

  return (
    <>
      {isLoading && <Loader />}
      <button
        onClick={() => {
          RemoveItemFromWishs(props.id);
        }}
        className="btn btn-outline-danger fs-6 border-0"
      >
        <i className="fa-solid fa-trash-can me-2 "></i>
        Remove
      </button>
    </>
  );
};

export default RemoveItemFromWishListButton;
