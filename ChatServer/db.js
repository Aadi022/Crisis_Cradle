const mongoose= require("mongoose");

try{
    mongoose.connect("mongodb+srv://aadityamta:am123@crisiscradle.etz1m.mongodb.net/");
    console.log("Successfully connected to the database");
}
catch{
    console.log("Could not connect with the database");
}

//We will be storing the messagelist in the database. Everytme the site re-renders, the messageList will be updated with the mesageList stored in the database. 
//Everytime a new message is sent, it'll be appended in the messageList in the database.

const ChatSchema= new mongoose.Schema({
    Room: String,
    messageList: [{
        room: String,
        author: String,
        message: String,
        time: String
    }]
});
const Chat= mongoose.model('Chat',ChatSchema);

module.exports={
    Chat: Chat,
}