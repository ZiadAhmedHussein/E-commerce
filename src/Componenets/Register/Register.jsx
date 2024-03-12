import React, { useContext, useState } from "react";
// import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ApiLinks } from "../../Context/AllApiLinks/AllApiLinks";

const Register = () => {
  // let [disabled, setDisabled] = useState("disabled");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { registerLink } = useContext(ApiLinks);

  let navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name is too SHORT")
      .max(15, "Name is too LONG")
      .required("Name is REQUIRED"),
    email: Yup.string()
      .email("Email Is NOT valid")
      .required("Email is REQUIRED"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Password is NOT valid")
      .required("Password is REQUIRED"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "PAssword and Re-password must be MATCHED")
      .required("Re-password is REQUIRED"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone is NOT valid")
      .required("Phone is REQUIRED"),
  });

  async function registerUserData(userData) {
    setErrorMessage("");
    setIsLoading(true);
    await axios
      .post(`${registerLink}`, userData)
      .then(() => {
        navigate("/login");
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
  }

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerUserData,
  });

  return (
    <>
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <div className="container py-5 ">
        <h2 className=" fw-bolder fs-3 mb-4">Register Now</h2>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={registerForm.handleSubmit}>
          <div className="fullName mb-3 ">
            <label className=" mb-2 " htmlFor="fullName">
              Name :
            </label>
            <input
              className=" form-control "
              type="text"
              id="fullName"
              name="name"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.name && registerForm.touched.name && (
              <div className="alert alert-danger ">
                {registerForm.errors.name}
              </div>
            )}
          </div>
          <div className="email mb-3">
            <label className=" mb-2 " htmlFor="email">
              Email :
            </label>
            <input
              className=" form-control "
              type="email"
              id="email"
              name="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />

            {registerForm.errors.email && registerForm.touched.email && (
              <div className="alert alert-danger ">
                {registerForm.errors.email}
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
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />

            {registerForm.errors.password && registerForm.touched.password && (
              <div className="alert alert-danger ">
                {registerForm.errors.password}
              </div>
            )}
          </div>
          <div className="rePassword mb-3">
            <label className=" mb-2 " htmlFor="rePassword">
              Re-password :
            </label>
            <input
              className=" form-control "
              type="password"
              id="rePassword"
              name="rePassword"
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />

            {registerForm.errors.rePassword &&
              registerForm.touched.rePassword && (
                <div className="alert alert-danger ">
                  {registerForm.errors.rePassword}
                </div>
              )}
          </div>
          <div className="phone mb-3">
            <label className=" mb-2 " htmlFor="phone">
              Phone :
            </label>
            <input
              className=" form-control "
              type="tel"
              id="phone"
              name="phone"
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />

            {registerForm.errors.phone && registerForm.touched.phone && (
              <div className="alert alert-danger ">
                {registerForm.errors.phone}
              </div>
            )}
          </div>
          <button
            className={`${
              isLoading && "disabled"
            } btn bg-main text-white d-block  ms-auto`}
            disabled={!(registerForm.isValid && registerForm.dirty)}
          >
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Register now"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
