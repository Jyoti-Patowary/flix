import axios from "axios"
import { useState, useEffect } from "react";
import TrendingAPIContent from "../TrendingAPIContent";


const Trending = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=3666a25e61485ebf50f59fec841801e2&page=${page}`
    );

    setContent(data.results);
};

useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
  }, [page]);

    return (
        <div>
        <span style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around", fontSize: "20px", padding: "20px"}}>Trending on Flix</span>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {content &&
       content.map((item) => (
        <TrendingAPIContent
          poster={item.poster_path}
          title={item.title || item.name}
              media_type={item.media_type}
            />
          ))}
        </div>
        </div>
    );
}

export default Trending;