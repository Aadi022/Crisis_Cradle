import { useState, useEffect,useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Disasterinfo.css";  // Importing the CSS
import { AdminContext } from "../App";

function DisasterList() {
    const navigate = useNavigate();
    const [disasters, setDisasters] = useState([]);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState([]);
    const [isReportedByOpen, setIsReportedByOpen] = useState([]);
    const {disastertype, setDisastertype,city, setCity}= useContext(AdminContext);

    useEffect(() => {  
        async function fetchDisasters() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/disaster/info", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setDisasters(response.data);

                    // Initialize toggle state arrays with 'false' for each item
                    setIsDescriptionOpen(new Array(response.data.length).fill(false));
                    setIsReportedByOpen(new Array(response.data.length).fill(false));
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message || "Failed to retrieve disaster information");
                } else if (error.request) {
                    alert("No response from server");
                } else {
                    alert("Error in fetching disasters");
                }
            }
        }
        fetchDisasters();
    }, []);

    // Toggle functions for dropdowns
    const toggleDescription = (index) => {
        setIsDescriptionOpen((prev) => {
            const newIsDescriptionOpen = [...prev];
            newIsDescriptionOpen[index] = !newIsDescriptionOpen[index];
            return newIsDescriptionOpen;
        });
    };

    const toggleReportedBy = (index) => {
        setIsReportedByOpen((prev) => {
            const newIsReportedByOpen = [...prev];
            newIsReportedByOpen[index] = !newIsReportedByOpen[index];
            return newIsReportedByOpen;
        });
    };

    // Handler for "Send Resources" button
    const handleSendResources = (index) => {
        // Implement the functionality for sending resources here
        alert(`Resources sent for disaster at ${disasters[index].City}!`);
    };

    // Handler for "Send Resources" button
    const handleResources = (index) => {
        const selectedDisaster = disasters[index];
        setDisastertype(selectedDisaster.Disaster_Type);
        setCity(selectedDisaster.City);
        navigate("/resources");
    };

    return (
        <div className="disaster-list-container">
            <h1>Disaster Information</h1>
            <ul className="disaster-list">
                {disasters.map((disaster, index) => (
                    <li key={index} className="disaster-card">
                        <h2>{disaster.Disaster_Type} in {disaster.City}</h2>
                        <p><strong>Town:</strong> {disaster.disasters.Town}</p>
                        <p><strong>State:</strong> {disaster.disasters.State}</p>

                        {/* Location Information */}
                        <p><strong>Location:</strong> 
                            {disaster.disasters.Location && disaster.disasters.Location.Latitude && disaster.disasters.Location.Longitude 
                                ? `${disaster.disasters.Location.Latitude}, ${disaster.disasters.Location.Longitude}` 
                                : "Location data not available"}
                        </p>

                        {/* Descriptions Dropdown */}
                        <button
                            className="dropdown-button"
                            onClick={() => toggleDescription(index)}
                        >
                            {isDescriptionOpen[index] ? "Hide Descriptions" : "Show Descriptions"}
                        </button>
                        {isDescriptionOpen[index] && (
                            <ul className="description-list">
                                {disaster.disasters.Description && disaster.disasters.Description.map((desc, i) => (
                                    <li key={i} className="description-item">{desc}</li>
                                ))}
                            </ul>
                        )}

                        {/* Reported By Dropdown */}
                        <button
                            className="dropdown-button"
                            onClick={() => toggleReportedBy(index)}
                        >
                            {isReportedByOpen[index] ? "Hide Reported By" : "Show Reported By"}
                        </button>
                        {isReportedByOpen[index] && (
                            <ul className="reporter-list">
                                {disaster.disasters.Name && disaster.disasters.Name.map((name, i) => (
                                    <li key={i} className="reporter-item">{name}</li>
                                ))}
                            </ul>
                        )}

                        {/* Send Resources Button */}
                        <button onClick={()=>handleResources(index)}>
                            Send Resources
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DisasterList;
