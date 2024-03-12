import React, { useEffect, useState } from "react";
// import style from "./Brands.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loader from "../../Helpers/Loader/Loader";

const Brands = () => {
  const [isLoding, setIsLoading] = useState(true);
  const [arrOfBrands, setArrOfBrands] = useState({});

  async function getAllBrands() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(({ data }) => {
        setIsLoading(false);
        setArrOfBrands(data);

        console.log(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  async function getSpecificBrand(id) {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then(({ data }) => {
        setIsLoading(false);

        // console.log(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  return (
    <>
      {isLoding ? (
        <Loader />
      ) : (
        <>
          <h2 className="ps-3">All Brands</h2>
          <div className="row my-2">
            {arrOfBrands?.data?.map((brand) => (
              <div
                onClick={() => getSpecificBrand(brand._id)}
                key={brand._id}
                className="col-md-4 p-3 "
              >
                <div className="product text-center border rounded">
                  <img
                    src={brand.image}
                    height={300}
                    className="w-100"
                    alt="Brand"
                  />
                  <h3 className=" py-2 text-main fw-bold border-top ">
                    {brand.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Helmet>
        <title>Brands Page</title>
      </Helmet>
    </>
  );
};

export default Brands;
