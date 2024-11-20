import React, { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.svg";
import "./CSS/signin.css";
import { useMutation } from "@tanstack/react-query";
import { sendCode, verifyCode } from "../util/http";
import OtpField from "../components/OtpField/otpfield";
import { UiverseContext } from "../Context/Context";

const SignIn = () => {
  const navigate = useNavigate();

  const { setUser, setToken } = useContext(UiverseContext);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [emailId, setEmailId] = useState(null);

  const { mutateAsync: mutateAsyncSendCode } = useMutation({
    mutationFn: sendCode,
    onSuccess: () => {
      setIsCodeSent(true);
    },
  });

  const { mutateAsync: mutateAsyncVerifyCode } = useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleSendcodeSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);

    const data = Object.fromEntries(fd.entries());

    setEmailId(data?.email);
    try {
      const response = await mutateAsyncSendCode(data);
      // console.log("Email data is ======>>>>", data);
      // console.log("Response:", response);
    } catch (error) {
      console.error("Error during sending code:", error);
    }
  };

  const handleVerifyCode = async () => {
    // const data = {
    //   email: emailId,
    //   code: otp.join(""),
    // };
    try {
      const response = await mutateAsyncVerifyCode({
        email: emailId,
        code: otp.join(""),
      });
      // const token = response?.payload?.data?.token;
      localStorage.setItem("token", response?.data?.payload?.data?.token);
      localStorage.setItem(
        "userId",
        response?.data?.payload?.data?.userData?._id
      );

      setUser(response?.data?.payload?.data?.userData);
      setToken(response?.data?.payload?.data?.token);

      // console.log("response data is ===========>", response);
      // console.log("token is ======>>>>", response?.data?.payload?.data?.token);
      // console.log(
      //   "user Data is :============>",
      //   response?.data?.payload?.data?.userData
      // );
    } catch (error) {
      console.error("Error during verifying code:", error);
    }
  };

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
          <button
            className="form-submit-btn"
            type="submit"
            onClick={handleVerifyCode}
          >
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
