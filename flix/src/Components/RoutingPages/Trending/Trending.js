import axios from "axios";
import { useState, useEffect } from "react";
import TrendingAPIContent from "../../TrendingAPIContent";
import { Button, Switch } from "@mui/material";
import ListView from "../Trending/ListView";
import { useNavigate } from "react-router";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [displayData, setDisplay] = useState(true);

  const toggle = () => {
    setDisplay(!displayData);
  }

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=3666a25e61485ebf50f59fec841801e2&page=${page}`
    );
    console.log({data1 : data});
    setContent(data.results);
    const newArr = data.results;
    // console.log(newArr[2]);
  };

  console.log({content})
  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
  }, [page]);

  let navigate = useNavigate();

  let handleRedirect = (item) => {
    console.log("checking item",item);
    navigate(`/details/${item.title.toLowerCase()}`, {
      state: item
    })};


  return (
    <div>
      <span
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          fontSize: "20px",
          padding: "20px",
        }}
      >
        Trending on Flix
      </span>
      <span style={{display: "flex", flexDirection: "flex-end"}}>
      <Button sx={{borderRadius: "20px"}} onClick={(toggle)}>{displayData ? 'Gallery View' : 'List View'}</Button>
      </span>
      {displayData? (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {content &&
          content.map((item,index) => (
            <div onClick={() => handleRedirect(item)}>
              <TrendingAPIContent
              poster={item.poster_path}
              title={item.title || item.name}
              media_type={item.media_type}
              id={item.id}
            />
          </div>
          ))}
      </div>
      ):(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        {content &&
          content.map((item) => (
            
            <ListView
              poster={item.poster_path}
              title={item.title || item.name}
              media_type={item.media_type}
              overview={item.overview}
              vote_average={item.vote_average}
              release_date={item.release_date}
            />
          ))}
      </div>
      )}
    </div>
  );
};

export default Trending;
