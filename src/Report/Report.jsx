//Add description of disaster and add helpline number
import React,{useState} from 'react';
import "./Report.css";
import { useNavigate } from 'react-router-dom';

function Report(){
    const navigate= useNavigate();

    const [name,setName]= useState("");
    const [state,setState]= useState("");
    const [city,setCity]= useState("");
    const [town,setTown]= useState("");
    const [disaster,setDisaster]= useState("");

    const handlename= function handlename(event){
        setName(event.target.value);
    }

    const hanldestate= function handlestate(event){
        setState(event.target.value);
    }

    const handlecity= function handlecity(event){
        setCity(event.target.value);
    }

    const handletown= function handletown(event){
        setTown(event.target.value);
    }

    const handledisaster= function handledisaster(event){
        setDisaster(event.target.value);
    }

    const handlesubmit= function handlesubmit(){
        navigate("/userchat");
    }

    return(
        <>
            <h1>REPORT A DISASTER</h1>
            <form onSubmit={handlesubmit}>
                <h2>Enter Name:</h2>
                <input placeholder="Enter Your Name" value={name} onChange={handlename}></input>
                <h2>Enter State:</h2>
                <input placeholder="Enter State" value={state} onChange={hanldestate}></input>
                <h2>Enter City:</h2>
                <input placeholder="Enter City" value={city} onChange={handlecity}></input>
                <h2>Enter Town Name:</h2>
                <input placeholder="Enter Town Name" value={town} onChange={handletown}></input>
                <h2>Type Of Disaster to Reoprt:</h2>
                <select value={disaster} onChange={handledisaster}>
                    <option value="">Select Disaster Type</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="flood">Flood</option>
                    <option value="fire">Fire</option>
                    <option value="landslide">Landslide</option>
                    <option value="tornado">Tornado</option>
                    <option value="cyclone">Cyclone</option>
                </select> <br/>
                <button type="submit">REPORT</button>
            </form>
        </>
    )
}


export default Report;