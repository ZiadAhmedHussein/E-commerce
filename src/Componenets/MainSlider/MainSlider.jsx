import React from "react";
// import style from "./MainSlider.module.css";

import img_1 from "../../Assets/Images/slider-image-1.jpeg";
import img_2 from "../../Assets/Images/slider-image-2.jpeg";
import img_3 from "../../Assets/Images/slider-image-3.jpeg";

import Slider from "react-slick";

const MainSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 2000,
    autoplay: true,
  };
  return (
    <>
      <div className="container">
        <h2 className="my-3">Main Slider</h2>
        <div className="row mb-5">
          <div className="col-md-8 p-0">
            <div className="innerSlider">
              <Slider {...settings}>
                <div>
                  <img src={img_1} className="w-100" alt="image" />
                </div>
                <div>
                  <img src={img_2} className="w-100" alt="image" />
                </div>
                <div>
                  <img src={img_3} className="w-100" alt="image" />
                </div>
              </Slider>
            </div>
          </div>
          <div className="col-md-4 p-0">
            <div className="inner-images">
              <img src={img_1} className="w-100" alt="image" />
              <img src={img_3} className="w-100" alt="image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSlider;
