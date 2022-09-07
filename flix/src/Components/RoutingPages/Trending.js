import axios from "axios"
import { useState, useEffect } from "react";

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
        <span className='title'>Trending on Flix</span>
        <div className="trend">
        {content &&
          content.map((c) => (
            // <SingleContent
            //   key={c.id}
            //   id={c.id}
            //   poster={c.poster_path}
            //   title={c.title || c.name}
            //   date={c.first_air_date || c.release_date}
            //   media_type={c.media_type}
            //   vote_average={c.vote_average}
            console.log(c)
            // />
          ))}
        </div>
        </div>
    );
}

export default Trending;