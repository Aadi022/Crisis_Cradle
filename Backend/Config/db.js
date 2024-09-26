const mongoose= require("mongoose");
const DisasterSchema= require("../Models/disasterinfo.js");
const AdminSchema= require("../Models/admin.js");
const DonationSchema= require("../Models/donation.js");
const ResourceSchema= require("../Models/resources.js");

try{
    mongoose.connect("mongodb+srv://aadityamta:am123@crisiscradle.etz1m.mongodb.net/");
    console.log("Successfully connected to the database");
}
catch{
    console.log("Could not connect with the database");
}

const Disasterinfo= mongoose.model("Disasterinfo",DisasterSchema);
const Admin= mongoose.model("Admin",AdminSchema);
const Donation= mongoose.model("Donation",DonationSchema);
const Resources= mongoose.model("Resources",ResourceSchema);

module.exports={
    Disasterinfo: Disasterinfo,
    Admin: Admin,
    Donation: Donation,
    Resources: Resources
}