import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
// import style from "./CheckoutForm.module.css";

const CheckoutForm = () => {
  const { headers } = useContext(CartContext);
  let validationSchema = Yup.object({
    details: Yup.string()
      .min(5, "Your adress is too SHORT")
      .max(30, "Your adress is too LONG")
      .required("Your adress is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Your phone is NOT VALID")
      .required("Your phone is Required"),
    city: Yup.string()
      .min(3, "Your city name is too SHORT")
      .max(20, "Your city name is too LONG")
      .required("Your city name is Required"),
  });

  async function checkoutSubmit(values) {
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${localStorage.getItem(
          "cartId"
        )}?url=http://localhost:3000`,
        { values },
        { headers }
      )
      .then((res) => {
        window.location.href = res?.data?.session?.url;
      })
      .catch((err) => err);
  }

  let shippingAddressForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: checkoutSubmit,
  });

  return (
    <>
      <h2 className="mt-4">Shipping Address</h2>
      <form className="mt-4" onSubmit={shippingAddressForm.handleSubmit}>
        <div className="form-group mb-3">
          <label className="mb-2" htmlFor="details">
            Details :
          </label>
          <input
            className="form-control"
            type="text"
            id="details"
            name="details"
            onChange={shippingAddressForm.handleChange}
            value={shippingAddressForm.values.details}
            onBlur={shippingAddressForm.handleBlur}
          />
          {shippingAddressForm.errors.details &&
            shippingAddressForm.touched.details && (
              <div className="alert alert-danger ">
                {shippingAddressForm.errors.details}
              </div>
            )}
        </div>
        <div className="form-group mb-3">
          <label className="mb-2" htmlFor="phone">
            Phone :
          </label>
          <input
            className="form-control"
            type="tel"
            id="phone"
            name="phone"
            onChange={shippingAddressForm.handleChange}
            value={shippingAddressForm.values.phone}
            onBlur={shippingAddressForm.handleBlur}
          />
          {shippingAddressForm.errors.phone &&
            shippingAddressForm.touched.phone && (
              <div className="alert alert-danger ">
                {shippingAddressForm.errors.phone}
              </div>
            )}
        </div>
        <div className="form-group mb-3">
          <label className="mb-2" htmlFor="city">
            City :
          </label>
          <input
            className="form-control"
            type="text"
            id="city"
            name="city"
            onChange={shippingAddressForm.handleChange}
            value={shippingAddressForm.values.city}
            onBlur={shippingAddressForm.handleBlur}
          />
          {shippingAddressForm.errors.city &&
            shippingAddressForm.touched.city && (
              <div className="alert alert-danger ">
                {shippingAddressForm.errors.city}
              </div>
            )}
        </div>
        <button type="submit" className="btn bg-main w-100 text-white my-4 ">
          Pay Now
        </button>
      </form>
      <Helmet>
        <title>Checkout Form Page</title>
      </Helmet>
    </>
  );
};

export default CheckoutForm;
