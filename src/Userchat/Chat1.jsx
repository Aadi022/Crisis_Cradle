import Chat2 from './Chat2.jsx';  
import './Chat.css';
import io from 'socket.io-client';
import { useState } from 'react';

const socket= io.connect("http://localhost:3001");  //We have created an instance of socket in client which connects to the socket in the backend

function Chat1() {

  const [username,setUsername]= useState("");   //This is the state variable for the username
  const [room, setRoom]= useState("");   //This is the state variable for the room name
  const [showChat, setShowChat]= useState(false);   //This is a boolean state variable. This ensures that if a user joins the room, then only he can chat. If this is true then we call the Chat2 component

  const handleusername= function handleusername(event){
    setUsername(event.target.value);
  }

  const handleroom= function handleroom(event){
    setRoom(event.target.value);
  }

  const joinRoom= async function joinRoom(){      //User can join the room id once logged in with the username
    if(username!=="" && room !==""){
      await socket.emit("join_room",room);  //join_room is an event listener. Any socket.on with the same event listener can have access to this. We can make use of the data by socket.on
      setShowChat(true);  //Since the user has joined the room, he can now avail the chat window functionalities
    } 
  }
  
  return (
    <div className="App">
      {!showChat ? (      //If showChat is false, then the following will implement, i.e. the chat window functionalities can't be availed
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input type="text" placeholder="Enter Name" onChange={handleusername}/>
          <input type="text" placeholder="Enter city name" onChange={handleroom}/>
          <button onClick={joinRoom}>Join Chat</button>
        </div>
      ) : (     //If showChat is true, then the following will implement, i.e. the chat window functionalities can be availed by calling the Chat component
        <Chat2 socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Chat1;
