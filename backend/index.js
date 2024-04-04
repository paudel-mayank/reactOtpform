const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
// This will enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  //403 status code is for validation error
  const data = req.body.otp;
  //validating if the otp is exactly of length 6
  if (data.length > 6 || data.length < 6) {
    res
      .status(403)
      .send({ message: "OTP must be of length 6", status: false, code: 403 });
  }
  // if the last digit equals to 7
  if (data.charAt(5) == 7) {
    res.status(403).send({
      message: "OTP includes digit 7 at the end",
      status: false,
      code: 403,
    });
  } else {
    //true response
    res.status(200).send({
      message: " OTP Validated Successfully",
      status: true,
      code: 200,
    });
  }
});
app.listen(PORT, () => {
  console.log(`the server is running at port ${PORT}`);
});
