import axios from "axios";
import { useState, useEffect } from "react";
import TrendingAPIContent from "../../TrendingAPIContent";
import { Button, Switch } from "@mui/material";
import ListView from "../Trending/ListView";
import { useNavigate } from "react-router";
import "./Trending.css"

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [displayData, setDisplay] = useState(true);
  const [search, setSearch] = useState("");

  const toggle = () => {
    setDisplay(!displayData);
  }

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=3666a25e61485ebf50f59fec841801e2&page=${page}`
    );
    console.log('data1', data);
    setContent(data.results);
    const newArr = data.results;
    // console.log(newArr[2]);
  };

    console.log({content})
    useEffect(() => {
      window.scroll(0, 0);
      fetchTrending();
    }, [page]);



    useEffect(() => {
      console.log(search);
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US&query=${search}`)
        .then(function (response) {
          setContent(response.data.results || []);
            console.log("checking api response axios...........",content);
        })
        .catch(function (error) {
          console.error(error);
        });
    }, [search]);



  let navigate = useNavigate();

  let handleRedirect = (item,content,index) => {
    // console.log("checking item",item,content);
    console.log({item})
    navigate(`/details/${item.id}`, 
    {
      state: {
        content: content,
        index: index,
        type: item.media_type || 'movie',
      }
    }
    )
  };

// --------------------SORTING FUNCTION ----------------------

const [countNum, setCountNum] = useState(true);

const handleSort = (type) => {
  setCountNum(!countNum);
  // console.log("SORTING THESE ", coinData);

  if (countNum) {
    let sortedArr = content.sort((a, b) => {
      if (+a[type] > +b[type]) {
        return -1;
      } else {
        return 1;
      }
    });
    setContent([...sortedArr]);
  } else {
    let sortedArr = content.sort((a, b) => {
      if (+a[type] > +b[type]) {
        return 1;
      } else {
        return -1;
      }
    });
    setContent([...sortedArr]);
  }
  // console.log(countNum);
};
const handleSort2 = (type) => {
  setCountNum(!countNum);
  // console.log("SORTING THESE ", coinData);

  if (countNum) {
    let sortedArr = content.sort((a, b) => {
      if (a[type] > b[type]) {
        return -1;
      } else {
        return 1;
      }
    });
    setContent([...sortedArr]);
  } else {
    let sortedArr = content.sort((a, b) => {
      if (a[type] > b[type]) {
        return 1;
      } else {
        return -1;
      }
    });
    setContent([...sortedArr]);
  }
  // console.log(countNum);
};


// ------------------------RETURN STATEMENT -----------------


  return (
    <div>
      <span
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          fontSize: "20px",
          padding: "20px",
        }} className="headerFlix"
      >
        Trending on Flix
      </span>
    <div>  
    <div style={{display: "flex", flexDirection:"row",justifyContent: "space-between",flexWrap: "nowrap", position: "sticky", top: 50 }}>  
      <span style={{display: "flex", flexDirection: "flex-end"}}>
      <Button sx={{borderRadius: "20px"}} onClick={(toggle)}>{displayData ? 'Gallery View' : 'List View'}</Button>

      <Button sx={{borderRadius: "20px"}} onClick={() => handleSort2("title")}>{displayData ? 'Sort Name' : 'Sort Name'}</Button>

      <Button sx={{borderRadius: "20px"}} onClick={() => handleSort("vote_average")}>{displayData ? 'Rating' : 'Rating'}</Button>

      <Button sx={{borderRadius: "20px"}} onClick={() => handleSort2("release_date")}>{displayData ? 'Year' : 'Year'}</Button>
      
      </span>
      
      <input type="text" placeholder="Search for Movies or TV-Series" onChange={(e) => setSearch(e.target.value)} />
      <br />
      <br />
      </div>
      </div>
      <hr />
      <br />


      {displayData? (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {content &&
          content.map((item, index) => (
            <div onClick={() => handleRedirect(item,content, index)}>
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
            <div onClick={() => handleRedirect(item,content)}>
            <ListView
              poster={item.poster_path}
              title={item.title || item.name}
              media_type={item.media_type}
              overview={item.overview}
              vote_average={item.vote_average}
              release_date={item.release_date}
            />
            </div>
          ))}
      </div>
      )}
    </div>
  );
};

export default Trending;
