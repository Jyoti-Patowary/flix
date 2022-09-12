import axios from "axios"
import { imageSizeLarge, imageSizeSmall, noContent, unavailableLandscape } from "./Configure/Configure";
import DetailedView from "./Carousel"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from "react";
import { Backdrop } from "@mui/material";
import { height } from "@mui/system";

const style = {
 maxWidth: "60rem",
 height: "90%",
 backgroundColor: "red",
 margin: "40px 500px",
 left: "50%"

};

export default function TransitionModal({media_type, id, children}) {

  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US`
    );

    setContent(data);
    console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, [])

  return (
    <>
      <div className="media" style={{ cursor: "pointer" }} color="inherit" onClick={handleOpen}>{children}</div>
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
      
        <Box sx={style}>
        {content &&
        <>
        <img src={content.poster_path ? `${imageSizeLarge}/${content.poster_path}`: noContent}
                  alt={content.name || content.title} className="ContentModal__portrait"/>
        <img src={content.backdrop_path ? `${imageSizeLarge}/${content.backdrop_path}`: unavailableLandscape}
                  alt={content.name || content.title} className="ContentModal__landscape"/>
      
                  <div>
                    <DetailedView id={id} media_type={media_type} />
                  </div>
        </>
        }
        </Box>
      </Modal>
    </>
  );
}
