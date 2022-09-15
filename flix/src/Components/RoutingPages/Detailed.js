import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Trending from "./Trending/Trending";
import { imageSizeSmall, noContent } from "../Configure/Configure";
import TrendingAPIContent from "../TrendingAPIContent";
import { Button } from "@mui/material";
import newDetail from '../RoutingPages/newDetail';

function Detailed() {

  const { state } = useLocation();
  let [movieDetail, setMovieDetail] = useState(state.item);
  let [allmovieDetail, setAllMovieDetail] = useState(state.content);
  let [renderData, setRenderData] = useState(movieDetail);

  // const MovieDetail = JSON.stringify(state);
  setMovieDetail = JSON.stringify(state.content.join(""));
//   console.log("all movie passed....",allmovieDetail);
  
  // ------------------------------------------------------- INDEX MATCHING------
  
  let idIndex = allmovieDetail.map(
    (item) =>
      //   console.log("inserting ",item.id),
      item.id
  );
  // console.log("checking array of ids......",idIndex);
  const startIndex = idIndex.indexOf(movieDetail.id);
//   const startIndex = idIndex.indexOf(movieDetail.id);
//   console.log("checking the starting index.....",startIndex);
  let [currentMovieIndex, setCurrentMovieIndex] = useState(startIndex);


// ---------------------------------------------------------- Handling Buttons ----------

  let handleRedirect = (e) => {
    if (e.target.value == "-" && currentMovieIndex >= 0) {
        setCurrentMovieIndex(currentMovieIndex - 1);
    } else {
        setCurrentMovieIndex(currentMovieIndex + 1);
    }
    console.log("checking clicks", currentMovieIndex);
    console.log(allmovieDetail[currentMovieIndex]);
    
  };

//   let navigate = useNavigate();
  useEffect(()=>{

    setRenderData(allmovieDetail[currentMovieIndex]);
    // navigate(`/details/${renderData.title.toLowerCase()}`)

    
  },[currentMovieIndex])



  return (
    <>
      {/* <Routes>
      <Route path="/details/:id" element={<Detailed />} />
        {/* <Route path="*" element={<NoRoute />} /> 
       </Routes> */} 
      <div style={{}}>
        <h2 style={{}}>{renderData.title}</h2>
        <img src={`${imageSizeSmall}${renderData.poster_path}`} alt="" />
      </div>
      <Button value="-" onClick={handleRedirect}>
        Previous
      </Button>
      <Button value="+" onClick={handleRedirect}>
        Next
      </Button>
    </>
  );
}

export default Detailed;
