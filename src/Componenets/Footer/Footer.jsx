import React from "react";
import style from "./Footer.module.css";

import amazonImg from "../../Assets/Images/amazon.png";
import amExImg from "../../Assets/Images/amexcreditcard.jpg";
import masterCardImg from "../../Assets/Images/master-card.png";
import paypalImg from "../../Assets/Images/paypal.png";
import appStoreImg from "../../Assets/Images/appStore.png";
import googlePlayImg from "../../Assets/Images/googlePlay.png";

const Footer = () => {
  return (
    <footer
      className={`${style.footer} position-absolute bottom-0 start-0 end-0  d-flex align-items-center py-5 bg-black`}
    >
      <div className=" container">
        <h2 className=" text-white">Get The Fresh Cart App</h2>
        <p className="lead">
          We will send you a link, Open it on your phone to Download the app
        </p>
        <div className="form-group d-flex align-items-center justify-content-between py-4 px-2 gap-4  border-bottom ">
          <label className="d-none" htmlFor="userEmail">
            User email
          </label>
          <input
            className="form-control"
            type="email"
            placeholder="Email ..."
          />
          <button className="btn bg-main text-white w-25 ">
            Share App Link
          </button>
        </div>
        <div className=" postars px-2 text-white  d-flex justify-content-between align-items-center  py-4 border-bottom">
          <div className="partners gap-3 align-items-center    d-flex">
            <p className="m-0">Payment Partners</p>
            <ul className="d-flex align-items-center list-unstyled gap-3 m-0">
              <li>
                <img src={amazonImg} height={20} width={60} alt="amazonImg" />
              </li>
              <li>
                <img src={amExImg} height={20} width={60} alt="amExImg" />
              </li>
              <li>
                <img
                  src={masterCardImg}
                  height={20}
                  width={60}
                  alt="masterCardImg"
                />
              </li>
              <li>
                <img src={paypalImg} height={20} width={60} alt="paypalImg" />
              </li>
            </ul>
          </div>

          <div className="FreshCart align-items-center d-flex gap-3 ">
            <p className="m-0">Get deliveries with FreshCart</p>
            <ul className="d-flex align-items-center list-unstyled gap-3 m-0">
              <li>
                <img
                  src={appStoreImg}
                  height={30}
                  width={100}
                  alt="amazonImg"
                />
              </li>
              <li>
                <img
                  src={googlePlayImg}
                  height={30}
                  width={100}
                  alt="amExImg"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
