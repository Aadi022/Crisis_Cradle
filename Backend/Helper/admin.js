//This middleware checks if the email exists in the database, and then checks if the entered body is of valid credentials
const mongoose= require("mongoose");
const db= require("../Config/db.js");
const admindb= db.Admin;
const zod= require("zod");

const loginbody= zod.object({
    Email: zod.string().email(),
    Password: zod.string()
});

async function loginchecker(req,res,next){
    const body= req.body;  //Email and Password
    const result= loginbody.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            msg:"Incorrect format of credentials"
        });
    }
    const mydoc= await admindb.findOne({
        Email: body.Email
    });

    if(mydoc){
        req.mydoc= mydoc;    //Sending the mydoc function, the api that calls this middleware can access the document fetched using req.mydoc
        next();
    }
    else{
        res.status(404).json({
            msg:"The Email-ID is not present in out database"
        });
    }
}

module.exports= loginchecker;