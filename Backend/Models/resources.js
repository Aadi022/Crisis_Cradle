//This will be a database of the deployed resources
const mongoose= require("mongoose");

const ResourceSchema= new mongoose.Schema({
    Disaster_Type: String,
    City: String,
    Workforce: Number,
    FoodResources: Number,
    FirstAid: Number,
    WaterSupply: Number,
    ClothingSupply: Number,
    RescueTool:{
        Earthquake: Number,
        Flood: Number,
        Fire: Number,
        Landslide: Number,
        Tornado: Number,
        Cyclone: Number
    },
    Status: String   //Dispatched/In-Transit/Delivered
});

module.exports= ResourceSchema;