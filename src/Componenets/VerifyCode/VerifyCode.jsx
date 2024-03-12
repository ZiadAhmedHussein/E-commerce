// import style from "./VerifyCode.module.css";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

// import * as Yup from "yup";
import Loader from "../../Helpers/Loader/Loader";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  async function testVerifyCode(verifyCode) {
    setIsLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        verifyCode
      )
      .then((res) => {
        navigate("/reset-password");
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setErrorMessage(response?.data?.message);
        setIsLoading(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },

    onSubmit: testVerifyCode,
  });
  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="resetCode" className="fw-bold h4 my-3 ps-2 ">
            please enter verify code ....
          </label>
          <input
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="resetCode"
            name="resetCode"
            value={formik.values.resetCode}
          />
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-main text-white d-block  ms-auto mt-4"
          disabled={!formik.dirty}
        >
          Get Reset My Password
        </button>
      </form>
      <Helmet>
        <title>Verify Code Page</title>
      </Helmet>
    </>
  );
};

export default VerifyCode;
