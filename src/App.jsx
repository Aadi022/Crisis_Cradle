import Mainpage from "./Mainpage/Mainpage.jsx";
import Report from "./Report/Report.jsx";
import Signin from "./Signin/Signin.jsx";
import Chat1 from "./Userchat/Chat1.jsx";
import Success from "./Donate/Success.jsx";
import Failure from "./Donate/Failure.jsx";
import Checkout from "./Donate/Checkout.jsx";

import React,{useState} from 'react';
import { Route,Router,Routes } from "react-router-dom";

function App() {

    return(
        <>
        <Routes>
            <Route path="/" element={<Mainpage></Mainpage>}></Route>
            <Route path="/report" element={<Report></Report>}></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/userchat" element={<Chat1></Chat1>}></Route>
            <Route path="/success" element={<Success></Success>}></Route>
            <Route path="/failure" element={<Failure></Failure>}></Route>
            <Route path="/checkout" element={<Checkout></Checkout>}></Route>
        </Routes>
        </>
    )
  
}

export default App
