import axios from "axios";
import { useEffect, useState } from "react";
import TrendingAPIContent from "../TrendingAPIContent";

 const TvSeries = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchSeries = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
        );
        setContent(data.results);
      
       
      };
      useEffect(() => {
        window.scroll(0, 0);
        fetchSeries();
      }, [page]);


    return (
        <>
        <span className='title'>TvSeries</span>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {content &&
          content.map((item) => (
            <TrendingAPIContent
              poster={item.poster_path}
              title={item.title || item.name}
              media_type="tv"
            />
          ))}
      </div>
      </>
    );
}

export default TvSeries;