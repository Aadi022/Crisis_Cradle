import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signin.css";

function Signin(){
    const navigate= useNavigate();

    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");

    const handleusername= function handleusername(event){
        setUsername(event.target.value);
    }

    const handlepassword= function handlepassword(event){
        setPassword(event.target.value);
    }

    return(
        <>
        <h1>SIGN-IN</h1>
        <form>
            <h2>Enter your username</h2>
            <input placeholder="abcd@crisiscradle.in" value={username} onChange={handleusername}></input>
            <h2>Enter Password</h2>
            <input placeholder="123456" value={password} onChange={handlepassword}></input>
            <button type="submit">Submit</button>
        </form>
        </>
    );
}

export default Signin;