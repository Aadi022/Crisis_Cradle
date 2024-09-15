import Mainpage from "./Mainpage/Mainpage.jsx";
import Report from "./Report/Report.jsx";
import React,{useState} from 'react';
import { Route,Router,Routes } from "react-router-dom";

function App() {

    return(
        <>
        <Routes>
            <Route path="/" element={<Mainpage></Mainpage>}></Route>
            <Route path="/report" element={<Report></Report>}></Route>
        </Routes>
        </>
    )
  
}

export default App
