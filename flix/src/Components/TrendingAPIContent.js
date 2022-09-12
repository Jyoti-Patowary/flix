import { Badge } from "@mui/material"
import { imageSizeSmall, noContent } from "./Configure/Configure"
import TransitionsModal from "./Modal";
import "./TrendingAPIContent.css"

const TrendingAPIContent = ({poster, title, media_type,id }) => {
    return (
        <TransitionsModal media_type={media_type} id={id}>
        <div className="media">
        <img className="poster" src={poster ? `${imageSizeSmall}${poster}` : noContent} alt={title} />
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"}
        </span>
        </div>
        </TransitionsModal>
    );
}

export default TrendingAPIContent;