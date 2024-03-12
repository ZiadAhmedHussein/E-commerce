import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
// import style from "./ForgetPassword.module.css";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Loader from "../../Helpers/Loader/Loader";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email Is NOT valid")
      .required("Email is REQUIRED"),
  });

  async function testUserEmail(userEmail) {
    setIsLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        userEmail
      )
      .then(({ data }) => {
        // console.log(data);
        toast.success(data?.message);
        navigate("/verify-code");
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setErrorMessage(response?.data?.message);
        setIsLoading(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: testUserEmail,
  });

  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="fw-bold h4 my-3 ps-2 ">
            please enter your email ....
          </label>
          <input
            type="email"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            name="email"
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="alert alert-danger ">{formik.errors.email}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-main text-white d-block  ms-auto mt-4"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Get Verify Code
        </button>
      </form>
      <Helmet>
        <title>Forget Password Page</title>
      </Helmet>
    </>
  );
};

export default ForgetPassword;
