import React from "react";
import io from 'socket.io-client'
import { useState, useEffect} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import './Chat.css';

function Chat2({socket, username, room}){
    const [currentMessage, setCurrentMessage]= useState("");  //This is the message entered that is to be sent
    const [messageList, setMessageList]= useState([]);  //This stores all the messages

    const handlecurrentMessage= function handlecurrentMessage(event){
        setCurrentMessage(event.target.value);
    }

    const sendMessage= async function sendMessage(){
        if(currentMessage !== ""){
            const messageData= {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };   //This is the json data that will contain the actual message to be sent, the author of the message and the time of the message sent

            // Add the message to Client 1's message list immediately
            setMessageList((m) => [...m, messageData]);

            await socket.emit("send_message", messageData);  //This message, which is entered is now sent to the server. This is sent by client1

            setCurrentMessage("");  // Clear the message input field after sending
        }
    }

    useEffect(()=>{     //This is for the receiving of the message
        socket.off("receive_message").on("receive_message", function(data){   //This is where the server is sending the message it received
            setMessageList(m=>[...m,data]);
        })
    }, [socket]);   //The function in useEffect keeps on rendering as soon as the socket of client changes

    return (
        <div className="chat-window">
          <div className="chat-header">
            <p>Live Chat</p>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent) => {   //This helps in identifying the author of the message. Accordingly the chat box gets styled
                return (
                  <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input type="text" value={currentMessage} placeholder="Enter message" onChange={handlecurrentMessage} onKeyDown={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      );
}

export default Chat2;