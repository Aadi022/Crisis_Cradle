//This is the middleware where the report data gets verified, this will be called in the report router function in user.js
const zod= require("zod");
const db= require("../Config/db.js");
const disasterinfo= db.Disasterinfo;

const reportSchema= zod.object({
    Name: zod.string().trim().min(1),
    Town: zod.string().trim().min(1),
    City: zod.string().trim().min(1),
    State: zod.string().trim().min(1),  
    Disaster_Type: zod.string().trim().min(1)  
});

async function reportchecker(req,res,next){   //The body will be given in form- Name, Town, City, State 
    const body= req.body;
    const result= reportSchema.safeParse(body);
    if(result.success){
        next();
    }
    else{
        res.status(400).json({
            msg:"Incorrect format of data entered"
        });
    }
}

module.exports= reportchecker;