import {
  imageSizeLarge,
  imageSizeSmall,
  noContent,
  unavailableLandscape,
} from "./Configure/Configure";
import DetailedView from "./Carousel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { Backdrop } from "@mui/material";
import { height } from "@mui/system";
import { Axios } from "./Configure/axios.config";

const style = {
  maxWidth: "60rem",
  height: "90%",
  backgroundColor: "white",
  margin: "40px 500px",
  left: "50%",
};

export default function TransitionModal({ media_type, id, children }) {
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    if (!media_type) return;
    try {
      const { data } = await Axios.get(
        `/${media_type}/${id}?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US`
      );
      console.log({ data });
      setContent(data);
    } catch (err) {
      console.log({ err });
    }
  };

  const fetchVideo = async () => {
    if (!media_type) return;
    const { data } = await Axios.get(
      `/${media_type}/${id}/videos?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        // onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: "500px",
            padding: "10px",
            mt: 2,
            borderRadius: 1,
            height: "80vh",
            bgcolor : "white"
          }}
        >
          <Box
            sx={{
             height : "100%",
              overflowY: "scroll",
              overflowX : "hidden"
            }}
          >
            {content && (
              <>
                <img
                  src={
                    content.poster_path
                      ? `${imageSizeLarge}/${content.poster_path}`
                      : noContent
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${imageSizeLarge}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />

                <div>
                  <DetailedView id={id} media_type={media_type} />
                </div>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
