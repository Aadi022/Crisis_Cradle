// disaster.js
const express = require("express");
const router = express.Router();
const db = require("../Config/db.js");
const infodb = db.Disasterinfo;
const jwtchecker = require("../Helper/jwtchecker.js");

router.get("/info", jwtchecker, async function (req, res) {
    try {
        // Fetch all disaster documents
        const allDisasters = await infodb.find({});
        
        // Initialize an empty array to store the grouped results
        const groupedDisasters = [];
        
        // Map to keep track of unique (City, Disaster_Type) combinations
        const disasterMap = {};

        // Iterate over each disaster and group by City and Disaster_Type
        allDisasters.forEach(disaster => {
            const key = `${disaster.City}-${disaster.Disaster_Type}`;
            
            if (!disasterMap[key]) {
                // If the unique pair is not yet in the map, add a new entry as a JSON object
                disasterMap[key] = {
                    City: disaster.City,
                    Disaster_Type: disaster.Disaster_Type,
                    disasters: {
                        Location: disaster.Location,
                        Town: disaster.Town,
                        State: disaster.State,
                        Description: disaster.Description,
                        Name: disaster.Name,
                        Status: disaster.Status
                    }
                };
                // Push the new entry to the groupedDisasters array
                groupedDisasters.push(disasterMap[key]);
            }
        });

        // Return the grouped array as the response
        res.status(200).json(groupedDisasters);
    } catch (error) {
        console.error("Error fetching disaster information:", error);
        res.status(500).json({ 
            msg: "Failed to retrieve disaster information",
            error: error.message
        });
    }
});

module.exports = router;
