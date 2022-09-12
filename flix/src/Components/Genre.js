import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const FilterGenre =({ selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,}) => {

 


    const handleClick = () => {
    setSelectedGenres([...selectedGenres, genres]);
    setGenres(genres.filter((g) => g.id !== genres.id));
    setPage(1);
    console.info('You clicked the Chip.');
  };

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };


  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US`
    );
    setGenres(data.genres);
  };

  
  useEffect(() => {
    fetchGenres();

    return () => {
        setGenres([]); 
      };  }, []);

  return (
    <div style={{ padding: "60px 0" }}>
         {selectedGenres.map((genre) => (
            
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />))
        }
        {selectedGenres.map((genre) => (
            
            console.log("selectedGenres map - ",genre)
            ))
            }
        console.log(selectedGenres);
        {genres.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            clickable
            size="small"
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
}


export default FilterGenre;
