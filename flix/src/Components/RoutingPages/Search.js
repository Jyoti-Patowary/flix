import { useEffect, useState } from "react";
import axios from "axios";
import TrendingAPIContent from "../TrendingAPIContent";
import { TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ListView from "./Trending/ListView";

const Search = () => {
    const [type, setType] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);


    const [searchParam] = useState(["Movies", "Tv Series"]);
    
    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US&query=${search}&page=${page}&include_adult=false`
          );
          setContent(data.results);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
      }, [])
    return (
        <>
        <div className='title'>Search</div>
        <TextField  className="searchBox" label="Search" variant="filled" onChange={(e) => setSearch(e.target.value)} sx={{width: "50vw"}} 
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}/>
        <Button onClick={fetchSearch} variant="contained" style={{ marginLeft: 10, height: "8vh", width: "8vw" }} >
            Search
         </Button>
      

        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {content &&
          content.map((item) => (
            <TrendingAPIContent
              poster={item.poster_path}
              title={item.title || item.name}
              id={item.id}
              media_type={type ? "tv" : "movie"}
              >   <ListView value = {type}
              onChange={(event, newValue) => {
                setType(newValue);
                
                
              }}/></TrendingAPIContent>
          ))}
        {search &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
        </>
    );
}

export default Search;