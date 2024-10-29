import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CollapsibleNavbar.css';

const CollapsibleNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleDisasterInfoClick = () => {
        navigate('/disaster');
    };

    const handleChatClick = () => {
        navigate('/adminchat');
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/signin');
    };

    return (
        <div className="collapsible-navbar">
            <button onClick={toggleNavbar} className="toggle-button">
                ☰
            </button>
            <div className={`navbar-content ${isOpen ? 'open' : ''}`}>
                <button onClick={handleDisasterInfoClick}>Disaster Info</button>
                <button onClick={handleChatClick}>Chat</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default CollapsibleNavbar;
