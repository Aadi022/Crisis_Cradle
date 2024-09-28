import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Mainpage.css";
import logo from '../assets/Logo.jpg';
import aim from '../assets/aim.png';
import earthquake from '../assets/earthquake.png';
import cyclone from '../assets/cyclone.png';
import fire from '../assets/fire.png';
import flood from '../assets/flood.png';
import landslide from '../assets/landslide.png';
import tornado from '../assets/tornado.png';

function Mainpage() {
    const navigate = useNavigate();

    const handlereport = () => {
        navigate("/report");
    };

    const handlesignin = () => {
        navigate("/signin");
    };

    const handledonate= () => {
        navigate("/checkout");
    }

    return (
        <>
            <div className="topbar">
                <img src={logo} alt="logo" className="logo" />
                <div className="button-container">
                    <button className="report" onClick={handlereport}>REPORT A DISASTER</button>
                    <button className="donate" onClick={handledonate}>Donate</button>
                    <button className="signin" onClick={handlesignin}>Sign in for Admin</button>
                </div>
            </div>

            <div className="aimdiv">
                <img src={aim} alt="aim" className="aimpng" />
                <div className="aimdescription">
                    <h1>Your Safety is Our Priority</h1>
                    <p>
                        We strive to ensure the safety and well-being of disaster-affected communities. 
                        Our goal is to minimize damage, provide immediate assistance, and help rebuild lives after calamities.
                    </p>
                </div>
            </div>

            <div className="about-card">
                <h1 className="aboutus">About Us</h1>
                <p>
                    We are a dedicated disaster management NGO committed to providing immediate and effective relief 
                    during natural and man-made calamities such as floods, earthquakes, fires, and landslides. Our 
                    mission is to minimize the suffering of disaster-struck communities by offering timely assistance, 
                    resources, and rehabilitation support.
                </p>
            </div>

            <div className="whatwedo-card">
                <h1 className="whatwedo">What We Do</h1>
                <p>
                    At our NGO, we focus on providing comprehensive support before, during, and after calamities. 
                    When disasters such as floods, earthquakes, fires, and landslides strike, we are among the first 
                    to respond.
                </p>
            </div>

            <div className="ourcoverage-card">
                <h1 className="ourcoverage">Our Coverage</h1>

                <div className="disaster-card">
                    <h2>Earthquakes</h2>
                    <img src={earthquake} alt="earthquake" className="disaster-image" />
                    <p>We deploy rapid response teams to earthquake-hit areas, providing search and rescue operations, temporary shelters, and medical assistance.</p>
                </div>

                <div className="disaster-card">
                    <h2>Cyclones</h2>
                    <img src={cyclone} alt="cyclone" className="disaster-image" />
                    <p>Our teams ensure safe evacuation of affected communities, distribute essential supplies, and assist in recovery efforts post-cyclone.</p>
                </div>

                <div className="disaster-card">
                    <h2>Fire</h2>
                    <img src={fire} alt="fire" className="disaster-image" />
                    <p>We coordinate with firefighting units to control the fire and help the victims with evacuation and medical care.</p>
                </div>

                <div className="disaster-card">
                    <h2>Floods</h2>
                    <img src={flood} alt="flood" className="disaster-image" />
                    <p>We provide boats and rescue teams to evacuate people from flood-affected areas and distribute essential supplies like food and clean water.</p>
                </div>

                <div className="disaster-card">
                    <h2>Landslides</h2>
                    <img src={landslide} alt="landslide" className="disaster-image" />
                    <p>Our landslide response teams focus on rescuing people trapped under debris and ensuring safe evacuation routes.</p>
                </div>

                <div className="disaster-card">
                    <h2>Tornadoes</h2>
                    <img src={tornado} alt="tornado" className="disaster-image" />
                    <p>We work closely with local authorities to ensure quick recovery from tornado damage, offering relief and medical care to affected communities.</p>
                </div>
            </div>
        </>
    );
}

export default Mainpage;
