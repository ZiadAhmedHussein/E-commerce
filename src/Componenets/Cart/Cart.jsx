import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { Helmet } from "react-helmet";
import Loader from "../../Helpers/Loader/Loader";

import { CartContext } from "../../Context/CartContext";
import DeleteItemFromCartButton from "../../AllButtons/DeleteItemFromCartButton/DeleteItemFromCartButton";
import ClearUserCartButton from "../../AllButtons/ClearUserCartButton/ClearUserCartButton";
import IncreaseItemCountInCartButton from "../../AllButtons/IncreaseItemCountInCartButton/IncreaseItemCountInCartButton";
import DecreaseItemCountInCartButton from "../../AllButtons/DecreaseItemCountInCartButton/DecreaseItemCountInCartButton";
import CheckoutButton from "../../AllButtons/CheckoutButton/CheckoutButton";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [dataOfUserCart, setDataOfUserCart] = useState({});

  const [isloading, setIsloading] = useState(true);

  // const [dataAfterDeleteOneItem, setDataAfterDeleteOneItem] = useState({});
  const { getUserCart } = useContext(CartContext);
  let navigate = useNavigate();

  async function getUserCartIn() {
    if (
      !localStorage.getItem("numberCartItems") ||
      Number(localStorage.getItem("numberCartItems")) === 0
    ) {
      navigate("/home");
    } else {
      let res = await getUserCart();
      setDataOfUserCart(res);
      localStorage.setItem("cartId", res?.data?.data._id);
      setIsloading(false);
    }
  }

  useEffect(() => {
    getUserCartIn();
  }, []);

  function arrDisplayAfterAnyChange(updatedData) {
    setDataOfUserCart(updatedData);
  }

  return (
    <>
      {isloading && <Loader />}
      <div className="container p-5  bg-light my-5">
        <ClearUserCartButton onUpdatedData={arrDisplayAfterAnyChange} />
        <div className="tota my-3 d-flex justify-content-between align-items-center">
          <p className=" fs-5 fw-bold">
            Total Price :
            <span className="text-main ms-2 fw-medium fs-6">
              {dataOfUserCart?.data?.data?.totalCartPrice
                ? `${dataOfUserCart?.data?.data?.totalCartPrice} - EGP`
                : "0"}
            </span>
          </p>
          <p className=" fs-5 fw-bold">
            Total Items :
            <span className="text-main ms-2 fw-medium fs-6">
              {dataOfUserCart?.data?.numOfCartItems
                ? `${dataOfUserCart?.data?.numOfCartItems}`
                : "0"}
            </span>
          </p>
        </div>
        {dataOfUserCart?.data?.data?.products?.map((product) => (
          <div
            key={product.product.id}
            className="row py-4 my-2 border-1 border-bottom"
          >
            <div className="col-md-2 mb-4 mb-md-0">
              <img
                src={product.product.imageCover}
                className="w-100"
                alt="Product"
              />
            </div>
            <div className="col-md-8 text-center text-md-start">
              <h3>{product.product.title}</h3>
              <p className=" priceProduct fs-5  mb-0 mb-md-2">
                {`${product.price} - EGP`}
              </p>
              <DeleteItemFromCartButton
                onUpdatedData={arrDisplayAfterAnyChange}
                itemId={product.product.id}
              />
            </div>
            <div
              className={`${style.increseDecrese} col-md-2 mt-4 mt-md-0 d-flex justify-content-center align-items-center gap-3`}
            >
              <IncreaseItemCountInCartButton
                itemId={product.product.id}
                oldCount={product.count}
                onUpdatedData={arrDisplayAfterAnyChange}
              />
              <p className="m-0">{product.count}</p>
              <DecreaseItemCountInCartButton
                itemId={product.product.id}
                oldCount={product.count}
                onUpdatedData={arrDisplayAfterAnyChange}
              />
            </div>
          </div>
        ))}
        <CheckoutButton />
      </div>

      <Helmet>
        <title>Cart Page</title>
      </Helmet>
    </>
  );
};

export default Cart;
