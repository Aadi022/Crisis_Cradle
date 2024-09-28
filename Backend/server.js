const express= require("express");
const cors= require("cors");
const bodyparser= require("body-parser");
const app= express();
const port= 3000;
const MainRouter= require("./Routes/routes.js");


app.use(cors());
app.use(bodyparser.json());
app.use(MainRouter);



app.listen(port, function(){
    console.log("The server is running on port number ",port);
})