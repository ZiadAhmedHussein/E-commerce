import React, { useContext } from "react";
// import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../Assets/Images/logo.svg";
import { TokenContext } from "../../Context/Token";

const Navbar = () => {
  const { token, setToken } = useContext(TokenContext);

  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("cartId");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark position-fixed top-0 start-0 end-0 z-2  ">
        <div className="container">
          <Link className="navbar-brand" to={"/home"}>
            <img src={logoImage} alt="logo image" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token && (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/home"}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"cart"}>
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"wishList"}
                    >
                      Wish List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"products"}
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"categories"}
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"brands"}
                    >
                      Brands
                    </Link>
                  </li>
                </ul>
              </>
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item text-light align-self-center d-flex gap-3 me-2   ">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-tiktok"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-linkedin"></i>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      aria-current="page"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="  d-flex align-items-center">
                    <Link
                      to={
                        !localStorage.getItem("numberCartItems") ||
                        Number(localStorage.getItem("numberCartItems")) === 0
                          ? "/home"
                          : "/cart"
                      }
                      className={`cartItems position-relative`}
                    >
                      <i
                        className={` fs-4 fa-solid fa-cart-shopping text-white`}
                      ></i>
                      <p className=" h6 text-white bg-main px-2 rounded position-absolute top-0 start-100 translate-middle m-0">
                        {localStorage.getItem("numberCartItems")}
                      </p>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"register"}
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"login"}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
