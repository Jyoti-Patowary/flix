import { useEffect, useState } from "react";
import axios from "axios";
import TrendingAPIContent from "../TrendingAPIContent";
import { TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const [type, setType] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search?api_key3666a25e61485ebf50f59fec841801e2&language=en-US&query=${search}&page=${page}&include_adult=false`
          );
          setContent(data.results);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
      }, [type])
    return (
        <>
        <span className='title'>Search</span>
        <TextField  className="searchBox" label="Search" variant="filled" onChange={(e) => setSearch(e.target.value)}/>
        <Button onClick={fetchSearch} variant="contained" style={{ marginLeft: 10 }}>
            <SearchIcon fontSize="large" />
         </Button>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {content &&
          content.map((item) => (
            <TrendingAPIContent
              poster={item.poster_path}
              title={item.title || item.name}
              />
          ))}
        {search && !content}
      </div>
        </>
    );
}

export default Search;