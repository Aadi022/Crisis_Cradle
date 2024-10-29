import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import "./Visualization.css"; // Import the CSS file
import CollapsibleNavbar from "../NavBar/CollapsibleNavbar.jsx"; // Import the CollapsibleNavbar

// Register components with ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);

function Visualization() {
    const [requestData, setRequestData] = useState([]);
    const [resourceData, setResourceData] = useState([]);
    const [disasterTypeData, setDisasterTypeData] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch Request Data for Histogram
                const requestResponse = await axios.get("http://localhost:3000/visualize/requestCount", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRequestData(requestResponse.data);

                // Fetch Resource Data for Line Graph
                const resourceResponse = await axios.get("http://localhost:3000/visualize/resourcesByCity", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setResourceData(resourceResponse.data);

                // Fetch Disaster Type Data for Pie Chart
                const disasterTypeResponse = await axios.get("http://localhost:3000/visualize/disasterTypeByState", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDisasterTypeData(disasterTypeResponse.data);
            } catch (error) {
                console.error("Error fetching data for visualizations:", error);
            }
        }
        fetchData();
    }, [token]);

    // Prepare data for Histogram (Requests per Disaster_Type and City)
    const requestHistogramData = {
        labels: requestData.map(item => `${item.City} (${item.Disaster_Type})`),
        datasets: [
            {
                label: "Number of Requests",
                data: requestData.map(item => item.count),
                backgroundColor: "rgba(75,192,192,0.6)"
            }
        ]
    };

    // Prepare data for Line Graph (Resources per City)
    const resourceLineData = {
        labels: resourceData.map(item => item.City),
        datasets: [
            {
                label: "Workforce",
                data: resourceData.map(item => item.Workforce),
                fill: false,
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Food Resources",
                data: resourceData.map(item => item.FoodResources),
                fill: false,
                borderColor: "rgba(255,99,132,1)"
            },
            {
                label: "First Aid",
                data: resourceData.map(item => item.FirstAid),
                fill: false,
                borderColor: "rgba(54,162,235,1)"
            },
            {
                label: "Water Supply",
                data: resourceData.map(item => item.WaterSupply),
                fill: false,
                borderColor: "rgba(153,102,255,1)"
            },
            {
                label: "Clothing Supply",
                data: resourceData.map(item => item.ClothingSupply),
                fill: false,
                borderColor: "rgba(255,206,86,1)"
            }
        ]
    };

    // Prepare data for Pie Chart (Disaster Type by State)
    const disasterTypePieData = {
        labels: disasterTypeData.map(item => `${item.State} (${item.Disaster_Type})`),
        datasets: [
            {
                label: "Disaster Type Distribution",
                data: disasterTypeData.map(item => item.count),
                backgroundColor: [
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)",
                    "rgba(75,192,192,0.6)",
                    "rgba(153,102,255,0.6)"
                ]
            }
        ]
    };

    return (
        <div className="visualization-container">
            <h2 className="visualization-title">Disaster Data Visualizations</h2>

            {/* Add the collapsible navbar here */}
            <CollapsibleNavbar />

            {/* Container for side-by-side bar and line charts */}
            <div className="chart-row">
                <div className="chart-container">
                    <h3>Number of Requests per Disaster Type + City</h3>
                    <Bar
                        data={requestHistogramData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    right: 20 // Adds spacing between histogram and line chart
                                }
                            }
                        }}
                    />
                </div>

                <div className="chart-container">
                    <h3>Resources Required for Each City</h3>
                    <Line
                        data={resourceLineData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    left: 20 // Adds spacing between histogram and line chart
                                }
                            }
                        }}
                    />
                </div>
            </div>

            {/* Centered Pie Chart */}
            <div className="pie-chart-container">
                <h3>Disaster Type Distribution in Each State</h3>
                <Pie
                    data={disasterTypePieData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        layout: {
                            padding: {
                                top: 50 // Adds spacing to lower the pie chart
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Visualization;
