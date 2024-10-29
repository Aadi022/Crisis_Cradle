import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Report.css";
import { useNavigate } from 'react-router-dom';

function Report() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [town, setTown] = useState("");
    const [disaster, setDisaster] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // New loading state

    useEffect(() => {     
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
    }, []);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            console.log("Latitude:", location.latitude);
            console.log("Longitude:", location.longitude);
        }
    }, [location]);

    const handlesubmit = async (event) => {
        event.preventDefault();
        setLoading(true);  // Set loading to true on submit
        try {
            const response = await axios.post("http://localhost:3000/user/report", {
                Location: {
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

            if (response.status === 200) {
                alert(response.data.msg);
                setLoading(false);  // Set loading to false after successful response
                navigate("/userchat");  // Navigate after the response is handled
            }
        } catch (error) {
            setLoading(false);  // Ensure loading is reset in case of error
            if (error.response) {
                alert(error.response.data.msg);
            } else if (error.request) {
                alert("No response from the server");
            } else {
                alert("Error in reporting");
            }
        }
    };

    return (
        <>
            <h1>REPORT A DISASTER</h1>
            <form onSubmit={handlesubmit}>
                <h2>Enter Name:</h2>
                <input placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                <h2>Enter State:</h2>
                <input placeholder="Enter State" value={state} onChange={(e) => setState(e.target.value)} />
                <h2>Enter City:</h2>
                <input placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                <h2>Enter Town Name:</h2>
                <input placeholder="Enter Town Name" value={town} onChange={(e) => setTown(e.target.value)} />
                <h2>Type Of Disaster to Report:</h2>
                <select value={disaster} onChange={(e) => setDisaster(e.target.value)}>
                    <option value="">Select Disaster Type</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="flood">Flood</option>
                    <option value="fire">Fire</option>
                    <option value="landslide">Landslide</option>
                    <option value="tornado">Tornado</option>
                    <option value="cyclone">Cyclone</option>
                </select> 
                <h2>Enter Disaster Description (Optional):</h2>
                <input placeholder="Enter Disaster Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                <button type="submit" disabled={loading}>{loading ? "Submitting..." : "REPORT"}</button>
            </form>
        </>
    );
}

export default Report;
