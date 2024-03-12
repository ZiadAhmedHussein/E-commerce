import { Helmet } from "react-helmet";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import Products from "../Products/Products";

// import style from "./Home.module.css";

const Home = () => {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <Products />
      <Helmet>
        <title>Home Page</title>
      </Helmet>
    </>
  );
};

export default Home;
