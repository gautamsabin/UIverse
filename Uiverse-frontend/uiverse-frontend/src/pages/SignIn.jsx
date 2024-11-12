import React, { useState } from "react";

import { Link } from "react-router-dom";

import logo from "../assets/images/logo.svg";
import "./CSS/signin.css";
import { useMutation } from "@tanstack/react-query";
import { sendCode } from "../util/http";
import OtpField from "../components/OtpField/otpfield";

const SignIn = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [emailId, setEmailId] = useState(null);
  const { mutateAsync } = useMutation({
    mutationFn: sendCode,
    onSuccess: () => {
      setIsCodeSent(true);
    },
  });

  const handleSendcodeSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);

    const data = Object.fromEntries(fd.entries());

    setEmailId(data?.email);
    try {
      const response = await mutateAsync(data);
      // console.log("Email data is ======>>>>", data);
      // console.log("Response:", response);
    } catch (error) {
      console.error("Error during sending code:", error);
    }
  };

  console.log("the iscode sent is ===>", otp.join(""));
  return (
    <div className="signin-background">
      {!isCodeSent && (
        <div className="signin-container">
          <Link to="/">
            <img src={logo} alt="header-logo" className="signin-header-img" />
          </Link>
          <span className="signin-title">Nice to see you again</span>

          <form className="signin-form" onSubmit={handleSendcodeSubmit}>
            <label className="form-label">Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
            ></input>
            <button className="form-submit-btn" type="submit">
              Continue with Email
            </button>
          </form>

          <span className="signin-footer">
            By continuing, you agree to UiSearch's <a>Terms of Service</a> and{" "}
            <a>Privacy Policy</a>.
          </span>
        </div>
      )}

      {isCodeSent && (
        <div className="signin-container">
          <Link to="/">
            <img src={logo} alt="header-logo" className="verify-header-img" />
          </Link>
          <span className="verify-email-title">Check your inbox</span>
          <span className="verify-email-accountname">
            We sent a temporary login code to <a>{emailId}</a>. Not you?
          </span>
          <OtpField otp={otp} setOtp={setOtp} />
          <button className="form-submit-btn" type="submit">
            Continue with Email
          </button>
          <span className="signin-footer">
            By continuing, you agree to UiSearch's <a>Terms of Service</a> and{" "}
            <a>Privacy Policy</a>.
          </span>
        </div>
      )}
    </div>
  );
};

export default SignIn;
