//This is the schema of the Donation. Every donation done can be stored in this.
const mongoose= require("mongoose");

const DonationSchema= new mongoose.Schema({
    TransactionId: String,
    Name: String,
    MobileNumber: Number,
    Amount: Number
});

module.exports= DonationSchema;


