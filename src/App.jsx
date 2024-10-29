import Mainpage from "./Mainpage/Mainpage.jsx";
import Report from "./Report/Report.jsx";
import Signin from "./Signin/Signin.jsx";
import UserChat1 from "./Userchat/Chat1.jsx";
import Checkout from "./Donate/Checkout.jsx";
import DisasterList from "./Disasterinfo/Disasterinfo.jsx";
import Resources from "./Resources/Resources.jsx";
import AdminChat1 from "./AdminChat/Chat1.jsx";
import Visualization from "./Visualization/Visualization.jsx";
import React,{useState,createContext} from 'react';
import { Route,Router,Routes } from "react-router-dom";

export const AdminContext= createContext();  //We will be using the context api to pass the properties from Disasterinfo.jsx to Resources.jsx. The props will be Disaster_Type and Town

function App() {

    const [disastertype, setDisastertype]= useState("");   //This is the Disaster_Type which will be passed from Disasterinfo to Resources
    const [city, setCity]= useState("");    //This is the City which will be passed from Disasterinfo to Resources

    return(
        <>
        <AdminContext.Provider value={{disastertype,setDisastertype,city,setCity}}>
        <Routes>
            <Route path="/" element={<Mainpage></Mainpage>}></Route>
            <Route path="/report" element={<Report></Report>}></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/userchat" element={<UserChat1></UserChat1>}></Route>
            <Route path="/checkout" element={<Checkout></Checkout>}></Route>
            <Route path="/disaster" element={<DisasterList></DisasterList>}></Route>
            <Route path="/resources" element={<Resources></Resources>}></Route>
            <Route path="/adminchat" element={<AdminChat1></AdminChat1>}></Route>
            <Route path="/visualization" element={<Visualization></Visualization>}></Route>
        </Routes>
        </AdminContext.Provider>
        </>
    )
  
}

export default App
