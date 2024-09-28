import React from "react";
import axios from "axios";
import { useState } from "react";

function Checkout(){
    const [name,setName]= useState("");
    const [mobileNumber, setMobileNumber]= useState();
    const [amount, setAmount]= useState();

    const handlename= function handlename(event){
        setName(event.target.value);
    }

    const handlemobileNumber= function handlemobileNumber(event){
        setMobileNumber(event.target.value);
    }

    const handleAmount= function handleAmount(event){
        setAmount(event.target.value);
    }

    const handleSubmit= async function handleSubmit(event){
        event.preventDefault();
        const data = {
            name: name,
            mobileNumber: mobileNumber,
            amount: amount,
        }

        try{
            const response = await axios.post('http://localhost:3000/pay/create-order', data)
            console.log(response.data);
            if (response.data.url) {
                // Redirecting to the payment page
                window.location.href = response.data.url;
            }
        } 
        catch(error){
            console.log("error in payment", error)
        }
    }


    return(
        <>
        <div>
            <h1>Checkout</h1> <br/>
            <form onSubmit={handleSubmit}>
                <h2>Enter Name</h2> <br/>
                <input type="text" value={name} onChange={handlename} placeholder="Enter Full Name"></input> <br/>
                <h2>Enter Mobile Number</h2> <br/>
                <input type="number" value={mobileNumber} onChange={handlemobileNumber} placeholder="Enter Mobile Number"></input> <br/>
                <h2>Enter Amount to be transferred</h2>
                <input type="number" value={amount} onChange={handleAmount} placeholder="Enter Amount"></input> <br/>
                <button type="submit">Pay</button>
            </form>
        </div>
        </>
    )
}

export default Checkout;