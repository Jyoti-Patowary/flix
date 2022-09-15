
import React from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { imageSizeSmall, noContent } from "../Configure/Configure";
import { Button } from "@mui/material";
import "../RoutingPages/Detailed.css"

function Detailed() {
  const state = useLocation();
  const { id } = useParams();

  let getIndex = state.state.index + 1;
  let allmovieDetail = state.state.content;
  const type = state.state.type

  console.log({type})

  console.log({item: state.state.item})

  let [currentMovieIndex, setCurrentMovieIndex] = useState(getIndex);
  let [movieDetail, setMovieDetail] = useState({});

  // --------------------------------------- Handling Buttons ----------

  let navigate = useNavigate();

  let handleRedirect = (e) => {
    if (e.target.value == "-" && currentMovieIndex >= 0) {
      setCurrentMovieIndex(currentMovieIndex && currentMovieIndex - 1);
      navigate(`/details/${allmovieDetail[currentMovieIndex].id}`, {
        state: state.state,
      });
    } else {
      setCurrentMovieIndex(currentMovieIndex + 1);
      console.log("checking..", currentMovieIndex)
      navigate(`/details/${allmovieDetail[currentMovieIndex].id}`, {
        state: state.state,
      });
    }
  };

  // const [type, setType] = useState(0);

  useEffect(() => {
    console.log("oiii",id)
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US`
      )
      .then(function (response) {
        console.log("hiiii",response.data)
        setMovieDetail({ ...response.data});
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);

  
  return (
    <>
        <h2 className="mediaTitle">
          {movieDetail.title ? movieDetail.title : movieDetail.name}
        </h2>
      <div className="mediaPoster">
        <img src={`${imageSizeSmall}${movieDetail?.poster_path} `} alt="" />
        <div style={{}}>
        <div className="mediaPara">{movieDetail.overview}</div>
        <div className="mediaButton">
      <Button value="-" onClick={handleRedirect}>
        Previous
      </Button>
      <Button value="+" onClick={handleRedirect}>
        Next
      </Button>
      </div>
      </div>
      </div>
    </>
  );
}

export default Detailed;
