import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import {BottomNavigation, BottomNavigationAction} from "@mui/material"
import "./BottomNavbar.css"
import Trending from '../RoutingPages/Trending';



function BottomNavbar(props) {

    const [val, setVal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (val === 0){
            navigate('/')
        }
        else if (val === 1) {
            navigate("/movies");
        } else if (val === 2) {
            navigate("/series");
        } else if (val === 3) {
            navigate("/search");
        }
        }, [val, navigate]);
    
    return (
       <BottomNavigation  value={val} onChange={(event, newValue) => {setVal(newValue); }} showLabels 
             sx ={{width: "100%", position: 'fixed', backgroundColor: "black", zIndex: 100, bottom: 0,}}
             className='wrapper'>
            <BottomNavigationAction style={{ color: "white" }} label="Trending"/>
            <BottomNavigationAction style={{ color: "white" }} label="Movies"/>
            <BottomNavigationAction style={{ color: "white" }} label="Tv Series"/>
            <BottomNavigationAction style={{ color: "white" }} label="Search"/>
       </BottomNavigation>
    );
}

export default BottomNavbar;