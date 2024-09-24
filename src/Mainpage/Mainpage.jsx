import React, {useState} from 'react';
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

function Mainpage(){
    const navigate= useNavigate();

    const handlereport= function handlereport(){
        navigate("/report");
    }

    const handlesignin= function handlesignin(){
        navigate("/signin");
    }

    return(
        <>
        <div className='topbar'>
            <img src={logo} alt="logo" className='logo' />
            <button className='report' onClick={handlereport}>REPORT A DISASTER</button>
            <button className='donate'>Donate</button>
            <button className='signin' onClick={handlesignin}>Sign in for Admin</button> {/* Moved this button into the topbar */}
        </div>

        <div className='aimdiv'>
            <h1 className='aim'>Our Aim</h1>
            <img src={aim} alt="aim" className='aimpng'></img>
        </div>

        <div className='about-card'>
            <h1 className='aboutus'>About Us</h1>
            <p>
            We are a dedicated disaster management NGO committed to providing immediate and effective relief during natural and man-made calamities such as floods, earthquakes, fires, and landslides. Our mission is to minimize the suffering of disaster-struck communities by offering timely assistance, resources, and rehabilitation support. We work hand-in-hand with local authorities, volunteers, and partner organizations to ensure that those affected by disasters receive the care and help they need to rebuild their lives.
            </p>    
        </div>

        <div className='whatwedo-card'>
            <h1 className='whatwedo'>What We Do</h1>
            <p>
            At our NGO, we focus on providing comprehensive support before, during, and after calamities. When disasters such as floods, earthquakes, fires, and landslides strike, we are among the first to respond. Our trained teams are deployed to affected areas to deliver immediate relief, including evacuation, first aid, and rescue operations, ensuring that vulnerable populations receive the care they need.
            </p> 
        </div>

        <div className='ourcoverage-card'>
            <h1 className='ourcoverage'>Our Coverage</h1>
            <h2>Earthquakes</h2>
            <img src={earthquake} alt="earthquake" className='earthquake'/>
            <h2>Cyclones</h2>
            <img src={cyclone} alt="cyclone" className='cyclone'/>
            <h2>Fire</h2>
            <img src={fire} alt="fire" className='fire'/>
            <h2>Floods</h2>
            <img src={flood} alt="flood" className='flood'/>
            <h2>Landslides</h2>
            <img src={landslide} alt="landslide" className='landslide'/>
            <h2>Tornadoes   </h2>
            <img src={tornado} alt="tornado" className='tornado'/>
        </div>
        
        </>
    )
}

export default Mainpage;
