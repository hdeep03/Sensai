import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import React, { useEffect, useState } from "react";
import { get, post } from "../../../utilities.js";
import "../Player.css";

const VideoList = (props) => {
  const [vids, setVids] = useState({
    urls: ["https://www.youtube.com/embed/zsradfbfa"],
  });
  useEffect(() => {
    post("http://localhost:8000/api/v0/videos", {
      id: props.vidId,
      timestamp: parseInt(Math.round(props.time)),
    }).then((list) => {
      console.log(typeof vids);
      console.log(vids);
      console.log(list["urls"]);
      list["urls"].forEach((ele) =>
        setVids({
          urls: [...vids["urls"], "https://www.youtube.com/embed/" + ele],
        })
      );
    });
  }, []);
  return (
    <div>
      {vids["urls"].map((element) => (
        <p align="center">
          <iframe
            type="text/html"
            width="50%"
            height="400px"
            src={element}
            frameBorder="0"
          ></iframe>
          {element}
          Hellllo
          <br></br>
          <br></br>
        </p>
      ))}
    </div>
  );
};

export default VideoList;
