import "./Home.css";
import "../../utilities.css";
// import { Router } from "@react/router";
import React from "react";
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

import { get, post } from "../../utilities.js";

function Home() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      link: data.get("link"),
    });
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Card variant="outlined">
            <Typography variant="h5" component="div">
              Type your youtube link!
            </Typography>
          </Card>
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
      </Grid>
    </>
  );
}

export default Home;
