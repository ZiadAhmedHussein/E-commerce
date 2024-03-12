import React, { useContext, useState } from "react";
// import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { TokenContext } from "../../Context/Token";
import { Helmet } from "react-helmet";
import { ApiLinks } from "../../Context/AllApiLinks/AllApiLinks";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useContext(TokenContext);

  const { signinLink } = useContext(ApiLinks);

  let navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email Is NOT valid")
      .required("Email is REQUIRED"),
    password: Yup.string().required("Password is REQUIRED"),
  });

  async function loginUserData(userData) {
    setErrorMessage("");
    setIsLoading(true);
    await axios
      .post(`${signinLink}`, userData)
      .then(({ data }) => {
        navigate("/home");
        setIsLoading(false);
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
  }

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginUserData,
  });

  return (
    <>
      <div className="container py-5 ">
        <h2 className=" fw-bolder fs-3 mb-4">Login Now</h2>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={loginForm.handleSubmit}>
          <div className="email mb-3">
            <label className=" mb-2 " htmlFor="email">
              Email :
            </label>
            <input
              className=" form-control "
              type="email"
              id="email"
              name="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />

            {loginForm.errors.email && loginForm.touched.email && (
              <div className="alert alert-danger ">
                {loginForm.errors.email}
              </div>
            )}
          </div>
          <div className="password mb-3">
            <label className=" mb-2 " htmlFor="password">
              Password :
            </label>
            <input
              className=" form-control "
              type="password"
              id="password"
              name="password"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />

            {loginForm.errors.password && loginForm.touched.password && (
              <div className="alert alert-danger ">
                {loginForm.errors.password}
              </div>
            )}
          </div>

          <button
            className={`${
              isLoading && "disabled"
            } btn bg-main text-white d-block  ms-auto`}
            disabled={!(loginForm.isValid && loginForm.dirty)}
          >
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <Link to={"/forget-password"} className=" fw-bold h5">
          Forget your password ?
        </Link>
      </div>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
    </>
  );
};

export default Login;
