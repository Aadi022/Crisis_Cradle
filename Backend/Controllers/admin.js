//This file will contain all API logic related to the admin interactivity with the software(except chat application). This will mainly relate to the admin database. This is basic signup and signin
const express= require("express");
const router= express.Router();
router.use(express.json());
const db= require("../Config/db.js");
const admindb= db.Admin;
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const saltrounds= 12;
const loginmiddleware= require("../Helper/admin.js");
require('dotenv').config();
const JWTsecret= process.env.JWTSECRET_ACCESS;
const refresh_secret= process.env.JWTSECRET_REFRESH;
const gentoken= require("../Helper/auth.js")


router.post("/signup",async function(req,res){     //Creating a user(will be only used in Postman, not integrated with frontend)
    try{
        const body= req.body;  //FirstName, LastName, Email, Password
        const newentry= await admindb.create({
            FirstName: body.FirstName,
            LastName: body.LastName,
            Email: body.Email,
            Password: await bcrypt.hash(body.Password, saltrounds)
        });

        res.status(200).json({
            msg:"Successfully created the user"
        });
    }
    catch(error){
        res.status(500).json({
            msg:"Unable to create the user",
            error: error.message
        });
    }

});



router.post("/signin",loginmiddleware,async function(req,res){  //User sign-in
    try{
        const body= req.body;   //Email and Password
        const mydoc= req.mydoc;

        const result= await bcrypt.compare(body.Password,mydoc.Password);
        if(result){
            const accesstoken= gentoken.genaccess(body.Email);  //creates the access token
            const refreshtoken= gentoken.genrefresh(body.Email);  //creates the refresh token

            //stores the refresh token in an HTTP-only cookie
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly: true,  //Makes cookie inaccessible to Browser Javascript engine and only to http requests(security)
                sameSite: 'Lax',  //protects from csrf attacks- i.e. cookies will only be accessible by the requests sent from the same site, and not from different sites
                maxAge: 7*24*60*60*1000  //Refresh token are valid for 7 days
            });

            //return the access token in response body
            res.status(200).json({
                msg:"You have successfully logged-in",
                token: accesstoken
            });
        }
        else{
            res.status(403).json({
                msg:"Incorrect password entered"
            });
        }
    }
    catch(error){
        res.status(500).json({
            msg:"Unable to sign-in",
            error: error.message
        });
    }
});



//api to generate a new access token
router.post("/refresh",function(req,res){
    const refreshToken= req.cookies.refreshtoken;  //get the refresh token from the cookies
    console.log(refreshToken);
    if(!refreshToken){
        return res.status(401).json({
            msg:"Refresh token not in cookie"
        });
    }
    else{
        try{
            const decoded= jwt.verify(refreshToken,refresh_secret);
            const new_access= gentoken.genaccess(decoded.username);
            res.status(200).json({
                msg:"Successfully created the access token",
                accesstoken: new_access
            })
        }catch{
           res.status(403).json({
            msg:"Incorrect refreshtoken"
           });
        }
    }
})


router.get("/checkforadmin",async function(req,res){    //This will be used in chat application. Only the person with the jwt in its authorization headers can have admin as its name
    const authHeader= req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){    //This checks if authorization is not present or it doesn't start with 'bearer'
        return res.status(403).json({       //Forbidden status code
            msg: "You can't be the Admin"
        });   
    }

    const token= authHeader.split(' ')[1];  //This split method splits the string into an array of substring, and chooses the first index. So the array will be- ['bearer','jwttoken']

    try{
        const decoded= jwt.verify(token, JWTsecret);
        res.status(200).json({
            msg: "Welcome Admin!"
        });
    }
    catch{
        return res.status(403).json({
            msg: "You can't be the Admin"
        });
    }
})

module.exports= router;