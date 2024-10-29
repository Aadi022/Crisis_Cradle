const express = require("express");
const mongoose = require("mongoose");
const db = require("../Config/db.js");
const reportdb = db.Disasterinfo;
const resourcedb = db.Resources;
const router = express.Router();
router.use(express.json());
const reportchecker = require("../Helper/report.js");

router.post("/report", reportchecker, async function (req, res) {
    const body = req.body;

    try {
        // Check if a disaster with the same Disaster_Type and City already exists
        const existingDisaster = await reportdb.findOne({
            Disaster_Type: body.Disaster_Type,
            City: body.City
        });

        if (existingDisaster) {
            // If it exists, append the new description and name to the arrays
            const updatedDisaster = await reportdb.findOneAndUpdate(
                { _id: existingDisaster._id },
                {
                    $push: {
                        Description: body.Description,
                        Name: body.Name
                    }
                },
                { new: true }  // Return the updated document
            );

            return res.status(200).json({
                msg: "Successfully updated the existing disaster report",
                updatedDisaster
            });
        } else {
            // If no document exists for this disaster type + city, create a new one
            const newDisaster = await reportdb.create({
                Name: [body.Name],  // Initialize with the first name as an array
                Town: body.Town,
                City: body.City,
                State: body.State,
                Location: {
                    Latitude: body.Location.Latitude,
                    Longitude: body.Location.Longitude
                },
                Description: [body.Description],  // Initialize with the first description as an array
                Disaster_Type: body.Disaster_Type,
                Status: true  // Set status to true for an ongoing disaster
            });

            // Create a document for resources of the disaster
            const newResource = await resourcedb.create({
                City: body.City,
                Disaster_Type: body.Disaster_Type,
                Workforce: 0,
                FoodResources: 0,
                FirstAid: 0,
                WaterSupply: 0,
                ClothingSupply: 0,
                RescueTool: {
                    Earthquake: 0,
                    Flood: 0,
                    Fire: 0,
                    Landslide: 0,
                    Tornado: 0,
                    Cyclone: 0
                },
                Status: ""
            });

            return res.status(200).json({
                msg: "Successfully created a new disaster report",
                newDisaster
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: "An error occurred while processing the report",
            error: error.message
        });
    }
});

module.exports = router;
