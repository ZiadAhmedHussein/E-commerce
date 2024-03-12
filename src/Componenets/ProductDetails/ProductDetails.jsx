import React, { useContext, useEffect, useState } from "react";
import { ApiLinks } from "../../Context/AllApiLinks/AllApiLinks";
import { useParams } from "react-router-dom";
import axios from "axios";

import style from "./ProductDetails.module.css";

import Slider from "react-slick";

import AddToCartButton from "../../AllButtons/AddToCartButton/AddToCartButton";
import ProductPriceRate from "../../Helpers/ProductPriceRate/ProductPriceRate";
import Loader from "../../Helpers/Loader/Loader";
import { Helmet } from "react-helmet";
import HeartButton from "../../AllButtons/heartButton/heartButton";

const ProductDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState({});
  let { specificProductLink } = useContext(ApiLinks);
  let { id } = useParams();

  async function getProductDetails() {
    await axios
      .get(`${specificProductLink}${id}`)
      .then(({ data }) => {
        // console.log(data.data);
        setProductData(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplaySpeed: 2000,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Helmet>
        <title>{productData.title}</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row my-5">
            <div className="col-md-3 px-2">
              <Slider {...settings}>
                {productData.images.map((ele, index) => (
                  <img key={index} src={ele} className="w-100" alt="Product" />
                ))}
              </Slider>
            </div>
            <div className="col-md-9 d-flex flex-column justify-content-center">
              <h2 className=" fw-bold">{productData.title}</h2>
              <p className=" text-secondary">{productData.description}</p>
              <div className="product-category-price-rate mb-3 ">
                <p className={`${style.productCategory} m-0`}>
                  {productData.category.name}
                </p>
                <ProductPriceRate
                  rate={productData.ratingsAverage}
                  price={productData.price}
                />
              </div>
              <HeartButton id={productData._id} />

              <AddToCartButton productId={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
