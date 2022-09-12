import { Badge } from "@mui/material"
import { imageSizeSmall, noContent } from "../Components/Configure.js/Configure"
import "./TrendingAPIContent.css"

const TrendingAPIContent = ({poster, title, media_type}) => {
    return (
        <div className="media">
        <img className="poster" src={poster ? `${imageSizeSmall}${poster}` : noContent} alt={title} />
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"}
        </span>
        </div>
    );
}

export default TrendingAPIContent;