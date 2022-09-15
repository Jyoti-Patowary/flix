import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import {BottomNavigation, BottomNavigationAction} from "@mui/material"
import "./BottomNavbar.css"
import Trending from '../RoutingPages/Trending/Trending';



function BottomNavbar(props) {

    const [val, setVal] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (val === 0){
            navigate('/trending')
        }
        else if (val === 1) {
            navigate("/movies");
        } else if (val === 2) {
            navigate("/series");
        } else if (val === 3) {
            navigate("/search");
        }
        }, [val]);
    
    return (
       <BottomNavigation  value={val} onChange={(event, newValue) => {setVal(newValue); }} showLabels
             sx ={{width: "100%", backgroundColor: "black", bottom: 0,}}
             className='wrapper'>
            <BottomNavigationAction style={{ color: "white" }} label="Trending"/>
            <BottomNavigationAction style={{ color: "white" }} label="Movies"/>
            <BottomNavigationAction style={{ color: "white" }} label="Tv Series"/>
            <BottomNavigationAction style={{ color: "white" }} label="Search"/>
       </BottomNavigation>
    );
}

export default BottomNavbar;