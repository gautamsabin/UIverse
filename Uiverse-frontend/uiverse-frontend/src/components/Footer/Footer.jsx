import React from "react";

import "./footer.css";

import emailLogo from "../../assets/images/email.svg";
import whiteLogo from "../../assets/images/logo_white.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <img className="footer-logo" src={whiteLogo} alt="logo" />
        <div className="policies">
          <span>Terms of use</span>
          <span>Cookies Policies</span>
          <span>Privacy Policies</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="copyright">copyright@2025</span>
        <div className="footer-email">
          <img src={emailLogo} alt="email-logo" />
          <span className="email">info@logoipsum.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
