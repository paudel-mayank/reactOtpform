import { useState, useRef } from "react";
import "./App.css";
const OtpForm = ({ numberofinputs, otp, setOTP }) => {
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
    e.preventDefault();
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberofinputs - 1) {
      inputRef.current[index + 1].focus();
    }
  };
  const handleClipboardPaste = (e, index) => {
    // console.log(e, index);
    e.preventDefault();
    const getPastedText = e.clipboardData.getData("text");
    // console.log(getPastedText, "asdf");
    if (getPastedText.length > 6 || getPastedText.length < 6) {
      return false;
    }
    let newArray = [...otp];
    newArray.splice(0, getPastedText.length, ...getPastedText);
    setOTP(newArray);

    // Update the OTP array with the pasted digits
  };
  return (
    <>
      {otp.map((digit, index) => (
        <input
          key={index}
          // type="number"
          value={digit}
          maxLength={1}
          minLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
          onPaste={(e) => handleClipboardPaste(e, index)}
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
  let numberofinputs = 6;
  const [otp, setOTP] = useState(new Array(numberofinputs).fill(""));
  const handleOtpSubmit = async () => {
    const otpTosend = otp.join("");
    const body = {
      otp: otpTosend,
    };
    const response = await fetch("http://localhost:5000", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    try {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response as JSON
      // console.log(data); // Log the response data
    } catch (error) {
      // console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <div className="mt-4">
        <OtpForm numberofinputs={6} otp={otp} setOTP={setOTP} />
        <button onClick={handleOtpSubmit}> Submit</button>
      </div>
    </>
  );
}

export default App;
