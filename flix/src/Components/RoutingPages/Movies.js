import axios from "axios";
import { useEffect, useState } from "react";
import TrendingAPIContent from "../TrendingAPIContent";
import "./Movies.css"
import useGenre from "../Configure/GenreAPI";
import FilterGenre from "../Genre";
import Content from "../Pagination"

const Movies = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);  
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);

    console.log({selectedGenres})
    const fetchMovies = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
        );
        setContent(data.results);
      
      };
    
      useEffect(() => {
        window.scroll(0, 0);
        fetchMovies();
      }, [page, genreforURL]);
    

    return (
        <>
        {console.log("selectedGenres=",selectedGenres)}
        {console.log("setSelectedGenres=",setSelectedGenres)}
        {console.log("genres=",genres)}
        {console.log("setGenres = ",setGenres)}
        {console.log("setPage=",setPage)}
        
        <FilterGenre
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
        <span className='title'>Movies</span>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {content &&
          content.map((item) => (
            <TrendingAPIContent
              poster={item.poster_path}
              title={item.title || item.name}
              media_type="movie"
              id={item.id}
            />
          ))}
      </div>
      </>
    );
}

export default Movies;