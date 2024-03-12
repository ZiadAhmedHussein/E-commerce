import React from "react";
// import style from "./ProductPriceRate.module.css";

const ProductPriceRate = (props) => {
  return (
    <>
      <div className="price-rate d-flex justify-content-between align-items-center">
        <p className="price m-0">{`${props.price} EGP`}</p>
        <div className="rate-part d-flex gap-1 mb-2 ">
          <i className="rating-color fa-solid fa-star align-self-center"></i>
          <p className="rate-number m-0">{props.rate}</p>
        </div>
      </div>
    </>
  );
};

export default ProductPriceRate;
