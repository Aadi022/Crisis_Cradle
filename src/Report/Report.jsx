import React,{useState, useEffect} from 'react';
import axios from 'axios';
import "./Report.css";
import { useNavigate } from 'react-router-dom';

function Report(){
    const navigate= useNavigate();

    const [name,setName]= useState(""); //Defining state variable name
    const [state,setState]= useState(""); //State
    const [city,setCity]= useState("");  //City
    const [town,setTown]= useState("");  //Town
    const [disaster,setDisaster]= useState("");  //This stores the disaster type
    const [description, setDescription]= useState("");  //This stores the disaster description
    const [location, setLocation] = useState({   //This is for the coordinates of the location
        latitude: null,
        longitude: null,
    });
    const [error, setError] = useState(null);  //If there is an error to fetch the coordinates

    useEffect(() => {     
      // Check if the Geolocation API is supported by the browser
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    }, []); // empty dependency array ensures this runs only once on mount

    // Second useEffect to log location when it changes
    useEffect(() => {
        if (location.latitude && location.longitude) {
          console.log("Latitude:", location.latitude);
          console.log("Longitude:", location.longitude);
        }
    }, [location]); // this will run only when the `location` state changes

    const handlename= function handlename(event){
        setName(event.target.value);
    }

    const handlestate= function handlestate(event){
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

    const handledescription= function handledescription(event){
      setDescription(event.target.value);
    }

    const handlesubmit= async function handlesubmit(event){
        event.preventDefault();
        try{
          const response= await axios.post("http://localhost:3000/user/report",{
            Location:{
              Latitude: location.latitude,
              Longitude: location.longitude
            },
            Town: town,
            City: city,
            State: state,
            Description: description,
            Disaster_Type: disaster,
            Name: name
          });
          if(response.status===200){
            alert(response.data.msg);
            navigate("/userchat");
          }
        }
        catch(error){
          if(error.response){
            alert(error.response.data.msg);   //This is for when request has reached the backend, but there is other status code than 200
          }
          else if(error.request){
            alert("No response from the server");   //This is when the request has been sent, but there is no response from the server
          }
          else{
            alert("Error in reporting");
          }
        }
    }

    return(
        <>
            <h1>REPORT A DISASTER</h1>
            <form onSubmit={handlesubmit}>
                <h2>Enter Name:</h2>
                <input placeholder="Enter Your Name" value={name} onChange={handlename}></input>
                <h2>Enter State:</h2>
                <input placeholder="Enter State" value={state} onChange={handlestate}></input>
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
                </select> 
                <h2>Enter Disaster Description(Optional):</h2>
                <input placeholder='Enter Disaster Description' value={description} onChange={handledescription}></input><br/>
                <button type="submit">REPORT</button>
            </form>
        </>
    )
}

export default Report;
