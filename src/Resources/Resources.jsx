import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../App";

function Resources() {
    const navigate = useNavigate();
    const { disastertype, setDisastertype, city, setCity } = useContext(AdminContext);
    
    // Initialize state variables with 0 to control them from the start
    const [workforce, setWorkforce] = useState(0);
    const [foodResources, setFoodResources] = useState(0);
    const [firstAid, setFirstAid] = useState(0);
    const [waterSupply, setWaterSupply] = useState(0);
    const [clothingSupply, setClothingSupply] = useState(0);
    const [earthquake, setEarthquake] = useState(0);
    const [flood, setFlood] = useState(0);
    const [fire, setFire] = useState(0);
    const [landslide, setLandslide] = useState(0);
    const [tornado, setTornado] = useState(0);
    const [cyclone, setCyclone] = useState(0);

    // Define handler functions
    const handleWorkforce = (event) => setWorkforce(event.target.value);
    const handleFoodResources = (event) => setFoodResources(event.target.value);
    const handleFirstAid = (event) => setFirstAid(event.target.value);
    const handleWaterSupply = (event) => setWaterSupply(event.target.value);
    const handleClothingSupply = (event) => setClothingSupply(event.target.value);
    const handleEarthquake = (event) => setEarthquake(event.target.value);
    const handleFlood = (event) => setFlood(event.target.value);
    const handleFire = (event) => setFire(event.target.value);
    const handleLandslide = (event) => setLandslide(event.target.value);
    const handleTornado = (event) => setTornado(event.target.value);
    const handleCyclone = (event) => setCyclone(event.target.value);

    const handleSubmit = async function handleSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                "http://localhost:3000/resource/deploy",  // Ensure backend route is `/resource/deploy`
                {
                    Disaster_Type: disastertype,
                    City: city,
                    Workforce: workforce,
                    FoodResources: foodResources,
                    FirstAid: firstAid,
                    WaterSupply: waterSupply,
                    ClothingSupply: clothingSupply,
                    RescueTool: {
                        Earthquake: earthquake,
                        Flood: flood,
                        Fire: fire,
                        Landslide: landslide,
                        Tornado: tornado,
                        Cyclone: cyclone
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                alert(response.data.msg);
                navigate("/disaster");
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.msg);
            } else if (error.request) {
                alert("Server is not responding");
            } else {
                alert("Error in transferring resources");
            }
        }
    };

    return (
        <>
            <h1>SEND RESOURCES</h1>
            <form onSubmit={handleSubmit}>
                <h2>Workforce:</h2>
                <input
                    placeholder="Enter number of workforce required"
                    type="number"
                    value={workforce}
                    onChange={handleWorkforce}
                />
                <h2>Food-Resources:</h2>
                <input
                    placeholder="Enter number of food resource units required"
                    type="number"
                    value={foodResources}
                    onChange={handleFoodResources}
                />
                <h2>First-Aid:</h2>
                <input
                    placeholder="Enter number of First-Aid kits required"
                    type="number"
                    value={firstAid}
                    onChange={handleFirstAid}
                />
                <h2>Water-Supplies:</h2>
                <input
                    placeholder="Enter number of water supply units required"
                    type="number"
                    value={waterSupply}
                    onChange={handleWaterSupply}
                />
                <h2>Clothing-Supplies:</h2>
                <input
                    placeholder="Enter number of Clothing supply units required"
                    type="number"
                    value={clothingSupply}
                    onChange={handleClothingSupply}
                />
                <h2>Earthquake-Aid:</h2>
                <input
                    placeholder="Enter number of Earthquake-Aid Kits required"
                    type="number"
                    value={earthquake}
                    onChange={handleEarthquake}
                />
                <h2>Flood-Aid:</h2>
                <input
                    placeholder="Enter number of Flood-Aid Kits required"
                    type="number"
                    value={flood}
                    onChange={handleFlood}
                />
                <h2>Fire-Aid:</h2>
                <input
                    placeholder="Enter number of Fire-Aid Kits required"
                    type="number"
                    value={fire}
                    onChange={handleFire}
                />
                <h2>Landslide-Aid:</h2>
                <input
                    placeholder="Enter number of Landslide-Aid Kits required"
                    type="number"
                    value={landslide}
                    onChange={handleLandslide}
                />
                <h2>Tornado-Aid:</h2>
                <input
                    placeholder="Enter number of Tornado-Aid Kits required"
                    type="number"
                    value={tornado}
                    onChange={handleTornado}
                />
                <h2>Cyclone-Aid:</h2>
                <input
                    placeholder="Enter number of Cyclone-Aid Kits required"
                    type="number"
                    value={cyclone}
                    onChange={handleCyclone}
                />
                <button type="submit">Send Resources</button>
            </form>
        </>
    );
}

export default Resources;
