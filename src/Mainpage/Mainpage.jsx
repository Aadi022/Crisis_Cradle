import React, {useState} from 'react';
import "./Mainpage.css";
import logo from '../assets/Logo.jpg';
import aim from '../assets/aim.png';
function Mainpage(){

    return(
        <>
        <div className='topbar'>
            <img src={logo} alt="logo" className='logo' />
            <button className='report'>REPORT A DISASTER</button>
            <button className='donate'>Donate</button>
        </div>

        <div className='admindiv'>
            <button className='signin'>Sign in for Admin</button> 
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
        
        </>
    )
}

export default Mainpage;
