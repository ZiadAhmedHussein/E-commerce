import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { TokenContext } from "../../Context/Token";
import Loader from "../../Helpers/Loader/Loader";
// import { Helmet } from "react-helmet";

// import style from "./ResetPassword.module.css";

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useContext(TokenContext);

  let navigate = useNavigate();

  async function ResetUserPassword(newUserData) {
    setIsLoading(true);
    await axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        newUserData
      )
      .then(({ data }) => {
        navigate("/home");
        // console.log(data);
        setIsLoading(false);
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email Is NOT valid")
      .required("Email is REQUIRED"),
    newPassword: Yup.string().required("New Password is REQUIRED"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: ResetUserPassword,
  });

  return (
    <>
      {isLoading && <Loader />}
      <div className="container py-5 ">
        <h2 className=" fw-bolder fs-3 mb-4">Login Now</h2>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="email mb-3">
            <label className=" mb-2 " htmlFor="email">
              Email :
            </label>
            <input
              className=" form-control "
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.email && formik.touched.email && (
              <div className="alert alert-danger ">{formik.errors.email}</div>
            )}
          </div>
          <div className="password mb-3">
            <label className=" mb-2 " htmlFor="newPassword">
              New Password :
            </label>
            <input
              className=" form-control "
              type="password"
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="alert alert-danger ">
                {formik.errors.newPassword}
              </div>
            )}
          </div>

          <button
            className="btn bg-main text-white d-block  ms-auto"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Reset Your Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
