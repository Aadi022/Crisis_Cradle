const mongoose= require("mongoose");
const DisasterSchema= require("../Models/disasterinfo.js");
const AdminSchema= require("../Models/admin.js");
const ResourceSchema= require("../Models/resources.js");

try{
    mongoose.connect("mongodb+srv://aadityamta:am123@crisiscradle.etz1m.mongodb.net/");
    console.log("Successfully connected to the database");
}
catch{
    console.log("Could not connect with the database");
}

const Disasterinfo= mongoose.model("Disasterinfo",DisasterSchema);   //Stores the disaster information  
const Admin= mongoose.model("Admin",AdminSchema);    //Stores the admin data for sign-in 
const Resources= mongoose.model("Resources",ResourceSchema);   //Stores the resources sent to the disaster struck area

module.exports={
    Disasterinfo: Disasterinfo,
    Admin: Admin,
    Resources: Resources
}