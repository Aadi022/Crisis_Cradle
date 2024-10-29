import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signin.css";

function Signin(){
    const navigate= useNavigate();

    const [mail,setMail]= useState("");
    const [password,setPassword]= useState("");

    const handlemail= function handlemail(event){
        setMail(event.target.value);
    }

    const handlepassword= function handlepassword(event){
        setPassword(event.target.value);
    }

    const handleform= async function handleform(event){
        event.preventDefault();
        try{
            const response= await axios.post("http://localhost:3000/admin/signin",{
                Email: mail,
                Password: password
            })
            localStorage.setItem("token",response.data.token);    //Putting the jwt in the local storage
            if(response.status===200){
                alert(response.data.msg);
            }
            navigate("/disaster");
        }
        catch(error){
            if(error.response){
                alert(error.response.data.msg);
            }
            else if(error.request){
                alert("No response from server");
            }
            else{
                alert("Error in singing in");
            }
        }
    }

    return(
        <>
        <h1>SIGN-IN</h1>
        <form onSubmit={handleform}>
            <h2>Enter your Mail-ID</h2>
            <input placeholder="abcd@crisiscradle.in" value={mail} onChange={handlemail}></input>
            <h2>Enter Password</h2>
            <input type="password" placeholder="123456" value={password} onChange={handlepassword}></input>
            <button type="submit">Submit</button>
        </form>
        </>
    );
}

export default Signin;