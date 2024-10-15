const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
const router= express.Router();

router.use(bodyParser.json());
router.use(cors());

const razorpay = new Razorpay({
  key_id: 'rzp_test_DEvIsmgNnBeEH2',
  key_secret: 'RQHuXe8XPPXPcUOaPQvjQl6y'
});

// Endpoint to create an order
router.post("/createOrder", async (req, res) => {
  const { amount } = req.body;
  
  const options = {
    amount: amount * 100,  // Razorpay amount is in paisa
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send("Error creating order: " + error);
  }
});

// Endpoint to verify payment signature
router.post("/verifyPayment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const key_secret = "RQHuXe8XPPXPcUOaPQvjQl6y";

  const shasum = crypto.createHmac("sha256", key_secret);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");

  if (digest === razorpay_signature) {
    res.json({ status: "Payment Verified!" });
  } else {
    res.status(400).json({ status: "Payment Verification Failed" });
  }
});


module.exports= router;
