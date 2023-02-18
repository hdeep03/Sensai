import "../../pages/Home.css";
import "../../../utilities.css";
// import { Router } from "@react/router";
import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import ComponentsProgram from "../ComponentsProgram";
import "animate.css/animate.min.css";
import {
  AppBar,
  Container,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Card,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";

import { get, post } from "../../../utilities.js";
import { useNavigate } from "react-router-dom";

function Section2(props) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      link: data.get("link"),
    });
    props.setId(data.get("link"));
    navigate("/video");

    post("http://localhost:8000/api/v0/process", {
      id: data.get("link"),
    }).then((status) => {
      if (status["Transcript Status"] == "Success") {
        props.setTrans(Boolean(1));
        console.log("haha lets go");
      }
    });
  };

  return (
    <div className="section-2" id="information">
      <div className="sp-title">
        <div className="sp-content" />
        <ScrollAnimation
          animateIn="animate__backInRight"
          animateOut="animate__backOutRight"
          animateOnce={true}
          duration={1}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "0vh", minWidth: "100vw" }}
          >
            {" "}
            <div className="sp-title">
              <div className="sp-divider" />
              <div className="sp-title-content">
                Begin using SensAI by pasting a YouTube link here!
              </div>
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="link"
                label="Link to Video"
                name="link"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </ScrollAnimation>
      </div>
      <div className="audit-title" />\
      <div className="sp-title">
        <div className="sp-divider" />
        <ScrollAnimation
          animateIn="animate__backInLeft"
          animateOut="animate__backOutLeft"
          animateOnce={true}
          duration={1}
        >
          <div className="sp-title-content">SensAI's Components:</div>
        </ScrollAnimation>
      </div>
      <div className="sp-content">
        <ComponentsProgram />
        <div className="sp-content-image">
          <img src="assets/pdf_diagram.png" alt="security program" />
        </div>
      </div>
    </div>
  );
}

export default Section2;
