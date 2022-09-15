import { Badge, Divider } from "@mui/material"
import { imageSizeSmall, noContent } from "../../Configure/Configure"
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const ListView = ({poster, title, media_type, overview, release_date, vote_average}) => {

    const [content, setContent] = useState([]);

    let navigate = useNavigate();

    let handleRedirect = (item,content) => {
      console.log("checking item",item);
      navigate(`/details/${item.title.toLowerCase()}`, 
      {
        state: {
          item: item,
          content: content
        }
      }
      )};
  
    return (
        <>
        <div>

        <div style={{display:"grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr)", alignItems: "center"}}>
            <div>
            <img onClick={() => handleRedirect( content)} style={{maxWidth: "150px"}} src={poster ? `${imageSizeSmall}${poster}` : noContent} alt={title} />
            </div>
            <div>{title}<br/><span>Ratings: {vote_average}</span></div>
            <div><span>Release Date: <br/>{release_date}</span></div>
            <div style={{color: "red"}}>{overview}</div>
            </div>
            {/* <Divider/> */}
        </div>
        <div style={{padding:"10px 0 "}}></div>     
        </>
    );
}

export default ListView;