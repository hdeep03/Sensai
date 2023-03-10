import "./Video.css";
import "../../utilities.css";
import VideoList from "../modules/video/VideoList.js";
// // import { Router } from "@react/router";
// import React from "react";
import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";
import { Document, Page, pdfjs } from "react-pdf";
// import {
//   AppBar,
//   Container,
//   Toolbar,
//   Menu,
//   MenuItem,
//   Typography,
//   Card,
// } from "@mui/material";

import { get, post } from "../../utilities.js";

import React, { useState, useRef, useEffect } from "react";
import { findDOMNode } from "react-dom";
import logo from "../../unsure.jpg";
import Popup from "../modules/Popup";
import Search from "../modules/Search";
import "../modules/Player.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import ReactPlayer from "react-player";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import { CircularProgress, Grid } from "@mui/material";
import Paper from "@material-ui/core/Paper";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
import screenful from "screenfull";
import Controls from "../modules/Controls";
import { string } from "prop-types";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    width: "100%",

    position: "relative",
    // "&:hover": {
    //   "& $controlsWrapper": {
    //     visibility: "visible",
    //   },
    // },
  },

  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topControls: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  middleControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomWrapper: {
    display: "flex",
    flexDirection: "column",

    // background: "rgba(0,0,0,0.6)",
    // height: 60,
    padding: theme.spacing(2),
  },

  bottomControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // height:40,
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",

    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },

  volumeSlider: {
    width: 100,
  },
}));

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }

  return `${mm}:${ss}`;
};

let count = 0;
export const strings = [];

function VideoPlayer(props) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(props.vidId);
    if (!props.vidId) {
      navigate("/");
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const [quizFile, setQuizFile] = useState("");
  const [notesFile, setNotesFile] = useState("");

  const source = "https://www.youtube.com/watch?v=" + props.vidId;

  const [keyword1, setKeyword1] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const [quizvis, setQuizvis] = useState(false);
  const [notesvis, setNotesvis] = useState(false);

  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  useEffect(() => {
    if (props.trans) {
      setQuizvis(true);
      setNotesvis(true);
      sleep(5000).then(()=>{
      post("http://localhost:8000/api/v0/quiz", {
        id: youtube_parser(props.vidId),
        difficulty: "hard",
        quiz_type: "free response",
      }).then((ret) => {
        setQuizFile("http://localhost:8000/" + ret);
        setQuizvis(false);
      });
      post("http://localhost:8000/api/v0/notes", {
        id: youtube_parser(props.vidId),
      }).then((ret) => {
        setNotesFile("http://localhost:8000/" + ret);
        setNotesvis(false);
      });
      post("http://localhost:8000/api/v0/keywords", {
        id: youtube_parser(props.vidId),
      }).then((ret) => {
        setKeyword1(ret['keywords'][0]);
        setKeyword2(ret['keywords'][1]);
      });
    
    })
    }
  }, [props.trans]);

  const classes = useStyles();
  const [showControls, setShowControls] = useState(false);
  // const [count, setCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [bookmarks, setBookmarks] = useState([]);
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,

    muted: true,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    controls,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility == "visible") {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current);
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const addBookmark = () => {
    togglePopup();
    if (playing == true) {
      handlePlayPause();
    }

    const canvas = canvasRef.current;
    canvas.width = 160;
    canvas.height = 90;
    const ctx = canvas.getContext("2d");

    const dataUri = canvas.toDataURL();
    canvas.width = 0;
    canvas.height = 0;
    const bookmarksCopy = [...bookmarks];
    bookmarksCopy.push({
      time: playerRef.current.getCurrentTime(),
      display: format(playerRef.current.getCurrentTime()),
      image: dataUri,
    });

    if (!strings.includes(Math.floor(playerRef.current.getCurrentTime()))) {
      strings.push(Math.floor(playerRef.current.getCurrentTime()));
      setBookmarks(bookmarksCopy);
    }
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat == "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  return (
    <>
      <Toolbar />
      <Container maxWidth="md">
        <br></br>
        <br></br>
        <br></br>

        <div>
          <input
            type="button"
            hidden
            value="Click to Open Popup"
            onClick={togglePopup}
          />
          {isOpen && (
            <Popup
              content={
                <>
                  <div className="child flex-child">
                    <h1 className="headingText">
                      Section Help at{" "}
                      {parseInt(
                        (parseInt(strings.slice(-1)[0]) -
                          parseInt(strings.slice(-1)[0] % 60)) /
                          60
                      )}
                      :{parseInt(strings.slice(-1)[0] % 60)}
                    </h1>
                    <br></br>
                    <br></br>
                    <Search />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2 className="paraText">
                      Supplemental Videos for this Section
                    </h2>
                    <br></br>

                    <VideoList
                      time={playerRef.current.getCurrentTime()}
                      vidId={props.vidId}
                    />
                  </div>
                </>
              }
              handleClose={togglePopup}
            />
          )}
        </div>

        <div className="parent flex-parent">
          <div className="child flex-child">
            <TextField></TextField>
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={hanldeMouseLeave}
              ref={playerContainerRef}
              className={classes.playerWrapper}
            >
              <ReactPlayer
                ref={playerRef}
                width="100%"
                height="100%"
                className="react-player"
                url={source}
                pip={pip}
                playing={playing}
                controls={false}
                light={light}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
                onProgress={handleProgress}
                config={{
                  file: {
                    attributes: {
                      crossOrigin: "anonymous",
                    },
                  },
                }}
              />

              <Controls
                ref={controlsRef}
                onSeek={handleSeekChange}
                onSeekMouseDown={handleSeekMouseDown}
                onSeekMouseUp={handleSeekMouseUp}
                // onDuration={handleDuration}
                // onRewind={handleRewind}
                onPlayPause={handlePlayPause}
                onFastForward={handleFastForward}
                playing={playing}
                played={played}
                elapsedTime={elapsedTime}
                totalDuration={totalDuration}
                onMute={hanldeMute}
                muted={muted}
                onVolumeChange={handleVolumeChange}
                onVolumeSeekDown={handleVolumeSeekDown}
                onChangeDispayFormat={handleDisplayFormat}
                playbackRate={playbackRate}
                onPlaybackRateChange={handlePlaybackRate}
                onToggleFullScreen={toggleFullScreen}
                volume={volume}
                onBookmark={addBookmark}
                trans={props.trans}
              />
            </div>

            <Grid container style={{ marginTop: 20 }} spacing={3}>
              {bookmarks.map((bookmark, index) => (
                <Grid key={index} item>
                  <Paper
                    onClick={() => {
                      playerRef.current.seekTo(bookmark.time);
                      controlsRef.current.style.visibility = "visible";

                      setTimeout(() => {
                        controlsRef.current.style.visibility = "hidden";
                      }, 1000);
                    }}
                    elevation={3}
                  >
                    <img
                      crossOrigin="anonymous"
                      width={100}
                      height={100}
                      src={logo}
                    />
                    <Typography variant="body2" align="center">
                      Unsure at {bookmark.display}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <br></br>
            <br></br>
            <br></br>
            <h1 align="center">Review Quiz</h1>
            <br></br>
            <Grid align="center">
              {quizvis ? (
                <>
                  <br></br>
                  <br></br>
                  <CircularProgress />
                  <br></br>
                  <Typography>Loading Quiz...</Typography>
                </>
              ) : (
                <></>
              )}
            </Grid>
            
            <iframe src={quizFile} width="100%" height="500px" />
            <br></br>
            <br></br>
            <br></br>
            <h1 align="center">AI Generated Notes</h1>
            <br></br>
            <Grid align="center">
              {notesvis ? (
                <>
                  <br></br>
                  <br></br>
                  <CircularProgress />
                  <br></br>
                  <Typography>Loading Notes...</Typography>
                </>
              ) : (
                <></>
              )}
            </Grid>
            <iframe src={notesFile} width="100%" height="500px" />
            <br></br>
            <br></br>
            <br></br>
            <h1 align="center">Beyond the Lecture</h1>
            <br></br>
            <p align="center"><iframe src="https://en.valuenex.com/en/login" width="60%" height="1000"></iframe></p>
            <div>To see how this information can be useful "Beyond the Lecture", here are some important themes that can be integrated with VALUENEX Radar's Scope tool.</div>
            <br></br>
            <div>Search Query:</div>
            <br></br>
            <div>What do you want to analyze: {keyword1}</div>
            <div>Secondary Keyword: {keyword2}</div>
            <br></br>
            <div>Search all Available Databases and Click Analyze to Extract Valuable Insights.</div>
          </div>
        </div>
        <canvas ref={canvasRef} />
      </Container>
    </>
  );
}

function Video(props) {
  return (
    <div>
      <Navbar page="video-player" />
      <VideoPlayer vidId={props.vidId} trans={props.trans} />
      <Footer />
    </div>
  );
}

export default Video;
