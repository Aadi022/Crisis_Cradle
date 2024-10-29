const express = require("express");
const router = express.Router();
const jwtchecker = require("../Helper/jwtchecker.js");
const db = require("../Config/db.js");
const resourcesdb = db.Resources;

/*
There will be two APIs:
    1) The first API will update any field in body (except status)
    2) The second API will change the status of the disaster 
*/

// PUT request to deploy resources and increment fields based on body input
router.put("/deploy", jwtchecker, async function (req, res) {
    try {
        const body = req.body; // Disaster_Type, City, Workforce, FoodResources, FirstAid, WaterSupply, ClothingSupply, RescueTool

        // Build increment object based on body fields
        const incrementObject = {};

        // Check each field if greater than 0, and add to increment object
        if (body.Workforce > 0) incrementObject.Workforce = body.Workforce;
        if (body.FoodResources > 0) incrementObject.FoodResources = body.FoodResources;
        if (body.FirstAid > 0) incrementObject.FirstAid = body.FirstAid;
        if (body.WaterSupply > 0) incrementObject.WaterSupply = body.WaterSupply;
        if (body.ClothingSupply > 0) incrementObject.ClothingSupply = body.ClothingSupply;

        // For RescueTool object, check each nested field
        if (body.RescueTool) {
            if (body.RescueTool.Earthquake > 0) incrementObject["RescueTool.Earthquake"] = body.RescueTool.Earthquake;
            if (body.RescueTool.Flood > 0) incrementObject["RescueTool.Flood"] = body.RescueTool.Flood;
            if (body.RescueTool.Fire > 0) incrementObject["RescueTool.Fire"] = body.RescueTool.Fire;
            if (body.RescueTool.Landslide > 0) incrementObject["RescueTool.Landslide"] = body.RescueTool.Landslide;
            if (body.RescueTool.Tornado > 0) incrementObject["RescueTool.Tornado"] = body.RescueTool.Tornado;
            if (body.RescueTool.Cyclone > 0) incrementObject["RescueTool.Cyclone"] = body.RescueTool.Cyclone;
        }

        // Check if any field is to be incremented
        if (Object.keys(incrementObject).length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }

        // Find the document by Disaster_Type and City and increment the specified fields
        const updatedResource = await resourcesdb.findOneAndUpdate(
            { Disaster_Type: body.Disaster_Type, City: body.City }, // Filter to find the specific resource document
            { $inc: incrementObject }, // Increment the fields dynamically
            { new: true } // Return the updated document
        );

        if (updatedResource) {
            res.status(200).json({
                msg: "Resources deployed and updated successfully",
                updatedResource
            });
        } else {
            res.status(404).json({ message: "Resource not found for the specified Disaster_Type and City" });
        }
    } catch (error) {
        res.status(500).json({ 
            msg: "Failed to deploy resources",
            error: error.message 
        });
    }
});

// PUT request to update the disaster status
router.put("/status", jwtchecker, async function(req, res) {
    try {
        const body = req.body;  // Disaster_Type, City, Status (Dispatched/In-Transit/Delivered)
        const mystatus = await resourcesdb.findOneAndUpdate(
            { Disaster_Type: body.Disaster_Type, City: body.City },
            {
                $set: {
                    Status: body.Status
                }
            },
            { new: true } // Return the updated document
        );

        if (mystatus) {
            res.status(200).json({
                msg: "Successfully updated the status",
                updatedStatus: mystatus
            });
        } else {
            res.status(404).json({ message: "Resource not found for the specified Disaster_Type and City" });
        }
    } catch (error) {
        res.status(500).json({
            msg: "Failed to update the status",
            error: error.message
        });
    }
});

module.exports = router;
