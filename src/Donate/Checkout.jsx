import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Checkout.css";

const PaymentComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [contact, setContact] = useState(""); 
  const [amount, setAmount] = useState();
  const navigate = useNavigate(); 

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const startPayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const data = await fetch("http://localhost:3000/pay/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    }).then((t) => t.json());

    const options = {
      key: "rzp_test_DEvIsmgNnBeEH2",
      amount: data.amount, // Amount is in paise
      currency: data.currency,
      name: "Test Corp",
      description: "Test Transaction",
      order_id: data.id, // Replace this with order_id generated from backend
    
      handler: async function (response) {
        const data = {
          orderCreationId: options.order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
    
        const result = await fetch("http://localhost:5000/verifyPayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const verification = await result.json();
    
        // You can perform further actions here after payment verification
        if (verification.status === "Payment Verified!") {
          // Payment verified, do whatever you need here, like updating UI, etc.
          console.log("Payment successful");
        } else {
          // Handle payment failure scenario
          console.log("Payment verification failed");
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: contact,
      },
      theme: {
        color: "#3399cc",
      },
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
    
  };

  return (
      <div className="payment-container">
        <h1>Donate for Good Cause</h1>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="tel" placeholder="Enter your contact number" value={contact} onChange={(e) => setContact(e.target.value)}/>
        <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        <button onClick={startPayment}>Pay</button>
      </div>
  );
};

export default PaymentComponent;
