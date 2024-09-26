//This will store the admin data. The admin can have only signin. The signup is directly done by the database administrator in the database.
const mongoose= require("mongoose");


const AdminSchema= new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String
});

module.exports= AdminSchema;