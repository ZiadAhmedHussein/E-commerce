import React from "react";
// import style from "./PaymentDone.module.css";
import img from "../../Assets/Images/Paymentsuccessful.png";

const PaymentDone = () => {
  return (
    <>
      <div className="img my-5">
        <img src={img} className="w-100" alt="payment succsses" />
      </div>
    </>
  );
};

export default PaymentDone;
