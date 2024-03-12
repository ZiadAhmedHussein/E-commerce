import React, { useEffect, useState } from "react";
// import style from "./Categories.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loader from "../../Helpers/Loader/Loader";

const Categories = () => {
  const [isLoding, setIsLoading] = useState(true);
  const [arrOfCategory, setArrOfCategory] = useState({});
  const [arrOfSubCategory, setArrOfSubCategory] = useState({});
  const [categoryName, setCategoryName] = useState("");

  async function getAllCategories() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setIsLoading(false);
        setArrOfCategory(data);

        // console.log(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getSubCategories(id, catName) {
    await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      )
      .then(({ data }) => {
        setIsLoading(false);
        setArrOfSubCategory(data);
        setCategoryName(catName);
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
          <h2 className="ps-3">All Categories</h2>
          <div className="row my-2">
            {arrOfCategory?.data?.map((cat) => (
              <div
                onClick={() => getSubCategories(cat._id, cat.name)}
                key={cat._id}
                className="col-md-4 p-3 "
              >
                <div className="product text-center border rounded">
                  <img
                    src={cat.image}
                    height={300}
                    className="w-100"
                    alt="Category"
                  />
                  <h3 className=" py-2 text-main fw-bold border-top ">
                    {cat.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {isLoding ? (
        <Loader />
      ) : (
        <>
          {arrOfSubCategory.results > 0 && (
            <>
              <h2 className="text-main text-center fw-bold mt-5">{`${categoryName} Category`}</h2>
              <div className="row">
                {arrOfSubCategory.data.map((subCat) => (
                  <div key={subCat._id} className="col-md-4 p-3">
                    <p className="m-0 py-3 rounded border product text-center h4 fw-bold">
                      {subCat.name}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <Helmet>
        <title>Categories Page</title>
      </Helmet>
    </>
  );
};

export default Categories;
