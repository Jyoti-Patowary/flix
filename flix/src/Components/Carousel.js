import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { imageSizeSmall, noPicture } from "../Components/Configure/Configure";
import "./Carousel.css"


const handleDragStart = (e) => e.preventDefault();

const DetailedView = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((item) => (
    <div className="carouselItem">
      <img
        src={item.profile_path ? `${imageSizeSmall}/${item.profile_path}` : noPicture}
        alt={item?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{item?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
    
  );
};

export default DetailedView;