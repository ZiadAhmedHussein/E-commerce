import { Helmet } from "react-helmet";
import style from "./Products.module.css";
import axios from "axios";

import { ApiLinks } from "../../Context/AllApiLinks/AllApiLinks";

import { useQuery } from "react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../../AllButtons/AddToCartButton/AddToCartButton";
import ProductPriceRate from "../../Helpers/ProductPriceRate/ProductPriceRate";
import Loader from "../../Helpers/Loader/Loader";
import HeartButton from "../../AllButtons/heartButton/heartButton";

const Products = () => {
  let { allProducts } = useContext(ApiLinks);

  function getAllProducts() {
    return axios.get(`${allProducts}`);
  }

  let { data, isLoading } = useQuery("featuredProducts", getAllProducts);

  return (
    <>
      {isLoading && <Loader />}
      <div className="container">
        <h2 className="my-3">Featured Products</h2>

        <div className="row">
          {data?.data?.data.map((product) => (
            <div key={product._id} className="col-md-3 mb-5 ">
              <div className="product px-2 py-3">
                <Link to={`/productDetails/${product._id}`}>
                  <img
                    src={product.imageCover}
                    height={""}
                    className="w-100 mb-3 "
                    alt="Product Image"
                  />
                  <p className={`${style.productCategoryName} text-main `}>
                    {product.category.name}
                  </p>
                  <h3 className={`${style.productName}`}>
                    {product.title.split(" ").slice(0, 3).join(" ")} ...
                  </h3>
                  <ProductPriceRate
                    rate={product.ratingsAverage}
                    price={product.price}
                  />
                </Link>

                <HeartButton id={product._id} />

                <AddToCartButton productId={product._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Helmet>
        <title>Products Page</title>
      </Helmet>
    </>
  );
};

export default Products;
