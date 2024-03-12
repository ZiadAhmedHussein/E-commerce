import React, { useContext, useEffect } from "react";
// import style from "./App.module.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./Componenets/Layout/Layout";

import Home from "./Componenets/Home/Home";
import Products from "./Componenets/Products/Products";
import Categories from "./Componenets/Categories/Categories";
import Brands from "./Componenets/Brands/Brands";
import Cart from "./Componenets/Cart/Cart";
import Login from "./Componenets/Login/Login";
import Register from "./Componenets/Register/Register";
import NotFound from "./Componenets/NotFound/NotFound";
import { TokenContext } from "./Context/Token";
import ProtectedRoutesAfterLogin from "./ProtectedRoutes/ProtectedRoutesAfterLogin";
import ProtectedRoutesBeforeLogin from "./ProtectedRoutes/ProtectedRoutesBeforeLogin";
import ProductDetails from "./Componenets/ProductDetails/ProductDetails";
import CheckoutForm from "./Componenets/CheckoutForm/CheckoutForm";
import PaymentDone from "./Componenets/PaymentDone/PaymentDone";
import WishList from "./Componenets/WishList/WishList";
import ForgetPassword from "./Componenets/ForgetPassword/ForgetPassword";
import VerifyCode from "./Componenets/VerifyCode/VerifyCode";
import ResetPassword from "./Componenets/ResetPassword/ResetPassword";

export default function App() {
  let { setToken } = useContext(TokenContext);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutesAfterLogin>
              <Home />
            </ProtectedRoutesAfterLogin>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoutesAfterLogin>
              <Home />
            </ProtectedRoutesAfterLogin>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutesAfterLogin>
              <Products />
            </ProtectedRoutesAfterLogin>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoutesAfterLogin>
              <ProductDetails />
            </ProtectedRoutesAfterLogin>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutesAfterLogin>
              <Categories />
            </ProtectedRoutesAfterLogin>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutesAfterLogin>
              <Brands />
            </ProtectedRoutesAfterLogin>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutesAfterLogin>
              <Cart />
            </ProtectedRoutesAfterLogin>
          ),
        },
        {
          path: "/checkoutForm",
          element: (
            <ProtectedRoutesAfterLogin>
              <CheckoutForm />
            </ProtectedRoutesAfterLogin>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoutesAfterLogin>
              <PaymentDone />
            </ProtectedRoutesAfterLogin>
          ),
        },
        {
          path: "/wishList",
          element: (
            <ProtectedRoutesAfterLogin>
              <WishList />
            </ProtectedRoutesAfterLogin>
          ),
        },

        {
          path: "login",
          element: (
            <ProtectedRoutesBeforeLogin>
              <Login />
            </ProtectedRoutesBeforeLogin>
          ),
        },
        {
          path: "forget-password",
          element: (
            <ProtectedRoutesBeforeLogin>
              <ForgetPassword />
            </ProtectedRoutesBeforeLogin>
          ),
        },
        {
          path: "verify-code",
          element: (
            <ProtectedRoutesBeforeLogin>
              <VerifyCode />
            </ProtectedRoutesBeforeLogin>
          ),
        },
        {
          path: "reset-password",
          element: (
            <ProtectedRoutesBeforeLogin>
              <ResetPassword />
            </ProtectedRoutesBeforeLogin>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedRoutesBeforeLogin>
              <Register />
            </ProtectedRoutesBeforeLogin>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <div>
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}
