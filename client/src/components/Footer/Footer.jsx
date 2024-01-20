import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/*left side*/}

        <div className="flexColStart f-left">
          <img src="./logo2.png" alt="" width={120} />

          <span className="secondaryText">
            Our Vision is to help all people <br />
            create the best place for themselves to live.
          </span>
        </div>

        {/*right side*/}
        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">145 New York, FL 5467, USA</span>

          <div className="flexCenter f-menu">
            <span>Properties</span>
            <span>Services</span>
            <span>Products</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
