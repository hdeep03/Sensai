import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import React, { useEffect, useState } from "react";
import { get, post } from "../../../utilities.js";
import "../Player.css";

const VideoList = (props) => {
  const [vid1, setVid1] = useState("");
  const [vid2, setVid2] = useState("");
  const [vid3, setVid3] = useState("");
  const [vid4, setVid4] = useState("");

  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  useEffect(() => {
    post("http://localhost:8000/api/v0/videos", {
      id: youtube_parser(props.vidId),
      timestamp: parseInt(Math.round(props.time)),
    }).then((list) => {
      console.log(list["urls"]);
      setVid1("https://www.youtube.com/embed/"+list["urls"][0]);
      setVid2("https://www.youtube.com/embed/"+list["urls"][1]);
      setVid3("https://www.youtube.com/embed/"+list["urls"][2]);
      setVid4("https://www.youtube.com/embed/"+list["urls"][3]);
    });
  }, []);
  return (
    <div>
        <p align="center">
          <iframe
            type="text/html"
            width="50%"
            height="400px"
            src={vid1}
            frameBorder="0"
          ></iframe>
          <br></br>
          <br></br>
        </p>
        <p align="center">
          <iframe
            type="text/html"
            width="50%"
            height="400px"
            src={vid2}
            frameBorder="0"
          ></iframe>
          <br></br>
          <br></br>
        </p>
        <p align="center">
          <iframe
            type="text/html"
            width="50%"
            height="400px"
            src={vid3}
            frameBorder="0"
          ></iframe>
          <br></br>
          <br></br>
        </p>
        <p align="center">
          <iframe
            type="text/html"
            width="50%"
            height="400px"
            src={vid4}
            frameBorder="0"
          ></iframe>
          <br></br>
          <br></br>
        </p>
    </div>
  );
};

export default VideoList;
