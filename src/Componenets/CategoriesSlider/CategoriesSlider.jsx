import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import { ApiLinks } from "../../Context/AllApiLinks/AllApiLinks";
import Loader from "../../Helpers/Loader/Loader";

const CategoriesSlider = () => {
  let { allCatigories } = useContext(ApiLinks);

  const [isLoading, setIsLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([]);

  async function getAllCategories() {
    await axios
      .get(`${allCatigories}`)
      .then(({ data }) => {
        // console.log(data.data);
        setAllCategories(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
  };
  return (
    <>
      <div className="container my-5">
        <h2 className="my-3">Categories Slider</h2>
        <Slider {...settings}>
          {isLoading ? (
            <Loader />
          ) : (
            allCategories.map((category) => (
              <div className={style.category} key={category._id}>
                <img
                  src={category.image}
                  className={`${style.categoryImage} `}
                  alt=""
                />
                <h4 className={`${style.categoryName} ps-1 `}>
                  {category.name}
                </h4>
              </div>
            ))
          )}
        </Slider>
      </div>
    </>
  );
};

export default CategoriesSlider;
