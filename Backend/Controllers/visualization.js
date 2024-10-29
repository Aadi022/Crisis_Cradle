//Number of requests per disaster_type+City (Get the length of the array of names)- Histogram
// Resoucres required for each city- line graph
// Disaster_Type in each state- Pie Chart
const express = require("express");
const router = express.Router();
const jwtchecker = require("../Helper/jwtchecker.js");
const db = require("../Config/db.js");
const infodb= db.Disasterinfo;
const resourcesdb= db.Resources;
const mongoose= require("mongoose");


//retrieves a count of requests grouped by Disaster_Type and City
router.get("/requestCount", jwtchecker, async (req, res) => {
    try {
        const disasterCounts = await infodb.aggregate([
            {
                $group: {
                    _id: { City: "$City", Disaster_Type: "$Disaster_Type" },
                    count: { $sum: { $size: "$Name" } }
                }
            },
            {
                $project: {
                    City: "$_id.City",
                    Disaster_Type: "$_id.Disaster_Type",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json(disasterCounts);
    } catch (error) {
        console.error("Error fetching request counts:", error);
        res.status(500).json({ 
            msg: "Failed to retrieve request counts",
            error: error.message
        });
    }
});



//retrieves the resources deployed by city
router.get("/resourcesByCity", jwtchecker, async (req, res) => {
    try {
        const resourcesByCity = await resourcesdb.aggregate([
            {
                $group: {
                    _id: "$City",
                    Workforce: { $sum: "$Workforce" },
                    FoodResources: { $sum: "$FoodResources" },
                    FirstAid: { $sum: "$FirstAid" },
                    WaterSupply: { $sum: "$WaterSupply" },
                    ClothingSupply: { $sum: "$ClothingSupply" },
                    RescueTool: { $sum: { $sum: "$RescueTool" } }
                }
            },
            {
                $project: {
                    City: "$_id",
                    Workforce: 1,
                    FoodResources: 1,
                    FirstAid: 1,
                    WaterSupply: 1,
                    ClothingSupply: 1,
                    RescueTool: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json(resourcesByCity);
    } catch (error) {
        console.error("Error fetching resources by city:", error);
        res.status(500).json({
            msg: "Failed to retrieve resources by city",
            error: error.message
        });
    }
});




//counts each Disaster_Type by State
router.get("/disasterTypeByState", jwtchecker, async (req, res) => {
    try {
        const disasterTypesByState = await infodb.aggregate([
            {
                $group: {
                    _id: { State: "$State", Disaster_Type: "$Disaster_Type" },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    State: "$_id.State",
                    Disaster_Type: "$_id.Disaster_Type",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json(disasterTypesByState);
    } catch (error) {
        console.error("Error fetching disaster types by state:", error);
        res.status(500).json({
            msg: "Failed to retrieve disaster types by state",
            error: error.message
        });
    }
});


module.exports= router;