import React from "react";
import { useRef } from "react";

import "./otp-field.css";

const OtpField = ({ otp, setOtp }) => {
  const otpBoxReference = useRef([]);
  const numberOfDigits = otp.length;

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  console.log("otp is 😁 ===>", otp);
  return (
    <div className="otp-field-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(reference) => (otpBoxReference.current[index] = reference)}
          className="otp-input-field"
        />
      ))}
    </div>
  );
};

export default OtpField;
