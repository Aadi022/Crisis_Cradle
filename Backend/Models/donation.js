//This is the schema of the Donation. Every donation done can be stored in this.
const mongoose= require("mongoose");

const DonationSchema= new mongoose.Schema({
    Donorid: String,
    Amount: Number,
    Date_of_transaction: Date
});

module.exports= DonationSchema;


