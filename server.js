const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/tours", require("./routes/toursRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/jp-travels", express.static("public"));

//Daraja API
const DARAJA_CONSUMER_KEY = process.env.DARAJA_CONSUMER_KEY;
const DARAJA_CONSUMER_SECRET = process.env.DARAJA_CONSUMER_SECRET;
const DARAJA_SHORTCODE = process.env.DARAJA_SHORTCODE;
const DARAJA_PASSKEY = process.env.DARAJA_PASSKEY;

// authentication token
const generateAuthToken = async () => {
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = Buffer.from(`${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error generating auth token:", error);
  }
};

// STK push 
app.post("/api/mpesa/stkpush", async (req, res) => {
  const { phoneNumber, amount } = req.body;
  const authToken = await generateAuthToken();
  const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, "");
  const password = Buffer.from(`${DARAJA_SHORTCODE}${DARAJA_PASSKEY}${timestamp}`).toString("base64");

  const stkPushRequest = {
    BusinessShortCode: DARAJA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: DARAJA_SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: "https://jp-safaris.com/api/mpesa/callback",
    AccountReference: "Test123",
    TransactionDesc: "Payment for tours and travels",
  };

  try {
    const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", stkPushRequest, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error initiating STK push:", error);
    res.status(500).json({ error: "Failed to initiate STK push" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
