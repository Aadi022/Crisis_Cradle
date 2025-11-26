import React, { useMemo, useState } from "react";
import CollapsibleNavbar from "../NavBar/CollapsibleNavbar.jsx";
import "./Prediction.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const DISASTER_SCHEMAS = {
    flood: {
        label: "Flood",
        description:
            "Predict imminent floods by combining hydro-meteorological indicators collected from the Flood India dataset.",
        fields: [
            { name: "latitude", label: "Latitude", type: "number", step: "0.0001" },
            { name: "longitude", label: "Longitude", type: "number", step: "0.0001" },
            { name: "rainfall", label: "Rainfall (mm)", type: "number", step: "0.01" },
            { name: "temperature", label: "Temperature (°C)", type: "number", step: "0.01" },
            { name: "humidity", label: "Humidity (%)", type: "number", step: "0.01" },
            { name: "river_discharge", label: "River Discharge (m³/s)", type: "number", step: "0.01" },
            { name: "water_level", label: "Water Level (m)", type: "number", step: "0.01" },
            { name: "elevation", label: "Elevation (m)", type: "number", step: "0.01" },
            {
                name: "surface_water_state",
                label: "Surface Water State",
                type: "select",
                options: ["Stable", "Overflow"]
            },
            {
                name: "land_cover",
                label: "Land Cover",
                type: "select",
                options: ["Forest", "Urban", "Water Body", "Agriculture"]
            },
            {
                name: "soil_type",
                label: "Soil Type",
                type: "select",
                options: ["Clay", "Loam", "Sand"]
            },
            { name: "population_density", label: "Population Density", type: "number", step: "1" },
            { name: "historical_floods", label: "Historical Flood Events", type: "number", step: "1", min: "0" }
        ]
    },
    landslide: {
        label: "Landslide",
        description:
            "Blend slope stability readings with lithology information from the Landslide India dataset to anticipate failures.",
        fields: [
            { name: "latitude", label: "Latitude", type: "number", step: "0.0001" },
            { name: "longitude", label: "Longitude", type: "number", step: "0.0001" },
            { name: "rainfall", label: "Rainfall (mm)", type: "number", step: "0.01" },
            { name: "temperature", label: "Temperature (°C)", type: "number", step: "0.01" },
            { name: "soil_moisture", label: "Soil Moisture (%)", type: "number", step: "0.01" },
            { name: "slope_angle", label: "Slope Angle (°)", type: "number", step: "0.01" },
            { name: "elevation", label: "Elevation (m)", type: "number", step: "0.01" },
            { name: "terrain_aspect", label: "Terrain Aspect (°)", type: "number", step: "0.01" },
            {
                name: "lithology",
                label: "Lithology",
                type: "select",
                options: ["Granite", "Shale", "Limestone"]
            },
            {
                name: "land_cover",
                label: "Land Cover",
                type: "select",
                options: ["Forest", "Urban", "Water Body", "Agriculture"]
            },
            {
                name: "soil_type",
                label: "Soil Type",
                type: "select",
                options: ["Clay", "Loam", "Sand"]
            },
            { name: "distance_to_road", label: "Distance to Road (m)", type: "number", step: "0.01" },
            { name: "historical_landslides", label: "Historical Landslides", type: "number", step: "1", min: "0" }
        ]
    },
    tsunami: {
        label: "Tsunami",
        description:
            "Use USGS seismic indicators plus contextual details from the Tsunami dataset to flag potential tsunami triggers.",
        fields: [
            { name: "latitude", label: "Latitude", type: "number", step: "0.0001" },
            { name: "longitude", label: "Longitude", type: "number", step: "0.0001" },
            { name: "year", label: "Event Year", type: "number", step: "1" },
            { name: "month", label: "Event Month", type: "number", step: "1", min: "1", max: "12" },
            { name: "cdi", label: "CDI", type: "number", step: "0.01" },
            { name: "mmi", label: "MMI", type: "number", step: "0.01" },
            { name: "sig", label: "Significance", type: "number", step: "1" },
            { name: "magnitude", label: "Magnitude", type: "number", step: "0.01" },
            { name: "nst", label: "Number of Stations", type: "number", step: "1" },
            { name: "dmin", label: "Hypocentral Distance", type: "number", step: "0.001" },
            { name: "gap", label: "Gap", type: "number", step: "0.01" },
            { name: "depth", label: "Depth (km)", type: "number", step: "0.01" },
            {
                name: "volcanic_eruption",
                label: "Volcanic Eruption",
                type: "select",
                options: ["Yes", "No"]
            }
        ]
    },
    earthquake: {
        label: "Earthquake Intensity",
        description:
            "Feed regional quake telemetry into the Earthquake dataset model to classify expected shaking intensity.",
        fields: [
            { name: "latitude", label: "Latitude", type: "number", step: "0.0001" },
            { name: "longitude", label: "Longitude", type: "number", step: "0.0001" },
            { name: "depth", label: "Depth (km)", type: "number", step: "0.01" },
            { name: "magnitude", label: "Magnitude", type: "number", step: "0.01" },
            {
                name: "mag_type",
                label: "Magnitude Type",
                type: "select",
                options: ["mb", "mwb", "mwc", "ml", "mw"]
            },
            { name: "nst", label: "Number of Stations", type: "number", step: "1" },
            { name: "gap", label: "Gap", type: "number", step: "0.01" },
            { name: "dmin", label: "Epicentral Distance", type: "number", step: "0.0001" },
            { name: "rms", label: "RMS", type: "number", step: "0.01" },
            {
                name: "alert_level",
                label: "Alert Level",
                type: "select",
                options: ["Green", "Yellow", "Orange", "Red"]
            },
            { name: "seismic_wave", label: "Seismic Wave Energy", type: "number", step: "0.0001" },
            { name: "energy", label: "Energy (10¹⁰ kJ)", type: "number", step: "0.0001" }
        ]
    }
};

const getInitialValues = type =>
    DISASTER_SCHEMAS[type].fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {});

function Prediction() {
    const [disasterType, setDisasterType] = useState("flood");
    const [formValues, setFormValues] = useState(getInitialValues("flood"));
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const schema = DISASTER_SCHEMAS[disasterType];

    const isFormComplete = useMemo(
        () => schema.fields.every(field => `${formValues[field.name]}`.trim() !== ""),
        [schema, formValues]
    );

    const handleTypeChange = event => {
        const nextType = event.target.value;
        setDisasterType(nextType);
        setFormValues(getInitialValues(nextType));
        setResult(null);
        setError("");
    };

    const handleFieldChange = (name, value) => {
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormValues(getInitialValues(disasterType));
        setResult(null);
        setError("");
    };

    const submitPrediction = async () => {
        if (!isFormComplete) {
            setError("Please fill every indicator before requesting a prediction.");
            setResult(null);
            return;
        }

        const payload = {
            disasterType,
            features: schema.fields.reduce((acc, field) => {
                const rawValue = formValues[field.name];
                acc[field.name] =
                    field.type === "number" ? Number.parseFloat(rawValue) : rawValue;
                return acc;
            }, {})
        };

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/predict`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Prediction service returned an error.");
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setResult({
                label: data.prediction,
                confidence: data.confidence,
                raw: data.rawPrediction
            });
        } catch (requestError) {
            setResult(null);
            setError(
                requestError.message ||
                    "Unable to fetch prediction. Please try again shortly."
            );
        } finally {
            setLoading(false);
        }
    };

    const renderField = field => {
        if (field.type === "select") {
            return (
                <label key={field.name} className="prediction-field">
                    <span>{field.label}</span>
                    <select
                        name={field.name}
                        value={formValues[field.name]}
                        onChange={event => handleFieldChange(field.name, event.target.value)}
                    >
                        <option value="">Select</option>
                        {field.options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
            );
        }

        return (
            <label key={field.name} className="prediction-field">
                <span>{field.label}</span>
                <input
                    type="number"
                    name={field.name}
                    value={formValues[field.name]}
                    min={field.min}
                    max={field.max}
                    step={field.step || "0.01"}
                    onChange={event => handleFieldChange(field.name, event.target.value)}
                />
            </label>
        );
    };

    return (
        <div className="prediction-page">
            <CollapsibleNavbar />
            <div className="prediction-card">
                <div className="prediction-header">
                    <div>
                        <h2>Data-driven Disaster Prediction</h2>
                        <p className="prediction-subtitle">
                            Choose a hazard type, provide the indicators curated in each
                            Capstone dataset, and let the trained model classify the risk.
                        </p>
                    </div>
                    <label className="disaster-selector">
                        <span>Disaster Type</span>
                        <select value={disasterType} onChange={handleTypeChange}>
                            {Object.entries(DISASTER_SCHEMAS).map(([key, details]) => (
                                <option key={key} value={key}>
                                    {details.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <p className="schema-description">{schema.description}</p>

                <div className="prediction-grid">{schema.fields.map(renderField)}</div>

                {error && <div className="prediction-error">{error}</div>}

                <div className="prediction-actions">
                    <button
                        className="predict-button"
                        onClick={submitPrediction}
                        disabled={loading}
                    >
                        {loading ? "Running model..." : "Predict"}
                    </button>
                    <button className="secondary-button" onClick={handleReset}>
                        Clear Inputs
                    </button>
                </div>

                {result && (
                    <div className="prediction-result">
                        <h3>Model Verdict</h3>
                        <div className="result-highlight">{result.label}</div>
                        {result.confidence && (
                            <div className="confidence-indicator">
                                <span>Confidence</span>
                                <strong>{result.confidence}%</strong>
                            </div>
                        )}
                        <p className="result-footnote">
                            Raw classifier output: <code>{result.raw}</code>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Prediction;

