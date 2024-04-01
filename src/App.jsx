import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

const OtpForm = ({ numberofinputs }) => {
  const [otp, setOTP] = useState(new Array(numberofinputs).fill(""));
  const inputRef = useRef([]);
  const handleChange = (value, index) => {
    let newArray = [...otp];
    newArray[index] = value;
    setOTP(newArray);
    if (value && index < numberofinputs - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBackspaceAndEnter = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberofinputs - 1) {
      inputRef.current[index + 1].focus();
    }
  };
  return (
    <>
      {otp.map((digit, index) => (
        <input
          key={index}
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
          ref={(reference) => (inputRef.current[index] = reference)}
          style={{
            width: "35px",
            height: "40px",
            textAlign: "center",
            margin: "0px 8px",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            borderRadius: "4px",
          }}
          //   className={`border w-1 h-auto text-white p-2
          //  rounded-md block  focus:border-2 focus:outline-none appearance-none`}
        />
      ))}
    </>
  );
};
function App() {
  return (
    <>
      <div className="mt-4">
        <OtpForm numberofinputs={6} />
      </div>
    </>
  );
}

export default App;
