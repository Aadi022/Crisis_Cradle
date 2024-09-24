const express= require("express");
const app= express();
const http= require("http");
const cors= require("cors");  //Requiring cors is very essential for socket else there'll be lots of bugs encountering
const port= 3001;
const {Server}= require("socket.io");
app.use(cors());

const server= http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"],        
        credentials: true                
    }
});

io.on("connection", function(socket){ 
    console.log("User connected :",socket.id);  

    socket.on("join_room", function(data){   
        socket.join(data);  
        console.log("User with ID ",socket.id," joined room ",data);
    })

    socket.on("send_message", function(data){   
        socket.to(data.room).emit("receive_message",data);  
    })

    socket.on("disconnect", function(){  
        console.log("User Disconnected", socket.id);    
    });
});


server.listen(port, ()=>{
    console.log("Server is running on port number ",port);
});