// import axios from "axios";
import React, { useContext, useEffect } from "react";
// import style from "./WishList.module.css";
import Loader from "../../Helpers/Loader/Loader";

import RemoveItemFromWishListButton from "../../AllButtons/RemoveItemFromWishListButton/RemoveItemFromWishListButton";
import { Helmet } from "react-helmet";
import AddToCartButton from "../../AllButtons/AddToCartButton/AddToCartButton";
import { WishListContext } from "../../Context/WishListContext/WishListContext";

const WishList = () => {
  const { isLoading, wishProducts, getUserWishList } =
    useContext(WishListContext);

  async function getUserWishLists() {
    await getUserWishList();
  }

  useEffect(() => {
    getUserWishLists();
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      <h2>My Wish List</h2>

      <div className="container p-5  bg-light my-5">
        {wishProducts?.data?.data.length !== 0 ? (
          wishProducts?.data?.data.map((product) => (
            <div
              key={product.id}
              className="row py-4 my-2 border-1 border-bottom"
            >
              <div className="col-md-2 mb-4 mb-md-0">
                <img src={product.imageCover} className="w-100" alt="Product" />
              </div>
              <div className="col-md-8 text-center text-md-start">
                <h3>{product.title}</h3>
                <p className=" priceProduct fs-5  mb-0 mb-md-2">
                  {`${product.price} - EGP`}
                </p>
                <RemoveItemFromWishListButton id={product.id} />
              </div>
              <div className="col-md-2">
                <AddToCartButton productId={product.id} />
              </div>
            </div>
          ))
        ) : (
          <p className="lead">My Wish List Is Empty</p>
        )}
      </div>
      <Helmet>
        <title>My Wish List</title>
      </Helmet>
    </>
  );
};

export default WishList;
