const express= require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const db= require("../Config/db.js");
const reportdb= db.Disasterinfo;
const router= express.Router();
router.use(express.json());
const reportchecker= require("../Helper/report.js");

router.post("/report",reportchecker,async function(req,res){
    const body= req.body;
        try{
        const entry= await reportdb.create({  //The body will be given in form- Name, Town, City, State, Description, Disaster_Type
            Name: body.Name,
            Town: body.Town,
            City: body.City,
            State: body.State,
            Location: 
                {
                    Latitude: body.Location.Latitude,
                    Longitude: body.Location.Longitude
                }
            ,
            Description: body.Description, // If included in the form
            Disaster_Type: body.Disaster_Type
        });
        res.status(200).json({
            msg:"Successfully entered the report details in database"
        });
    }
    catch{
        res.status(500).json({
            msg:"An error adding the report data"
        })
    }
});


module.exports= router;