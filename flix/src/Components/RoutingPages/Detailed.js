import React from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Trending from './Trending/Trending';

function Detailed() {

    const {state} = useLocation();
    const aaa = JSON.stringify(state);
    console.log("+++++++++++++++++++++++++++++",aaa);
    return (
        <div>
            {aaa.id}
        </div>
    );
}

export default Detailed;