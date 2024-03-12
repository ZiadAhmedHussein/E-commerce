import React, { useContext } from "react";
// import style from "./HeartButton.module.css";
import Loader from "../../Helpers/Loader/Loader";
import { WishListContext } from "../../Context/WishListContext/WishListContext";

const HeartButton = (props) => {
  const { isLoading, ProductToWishList } = useContext(WishListContext);

  async function onClickOnHeartIcon(id) {
    await ProductToWishList(id);
  }

  return (
    <>
      {isLoading && <Loader />}
      <button
        onClick={() => onClickOnHeartIcon(props.id)}
        className={` ${
          localStorage.getItem("wishList")?.split(",").includes(props.id)
            ? "heartIcon-red"
            : "heartIcon-gray"
        }  fs-1  my-2 ms-auto d-block bg-transparent border-0 px-0 align-items-center justify-content-end`}
      >
        <i className="fa-solid fa-heart"></i>
      </button>
    </>
  );
};

export default HeartButton;
