import React, { useEffect, useState } from "react";
import { get, post } from "../../utilities.js";
import "./Player.css";
import TextField from "@material-ui/core/TextField";
import { Button, Card } from "@material-ui/core/";
import BookmarkIcon from "@material-ui/icons/Search";
import { CircularProgress, Grid } from "@mui/material";

const Search = () => {
  const { strings } = require("../pages/Video.js");
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState("");
  const [done, isDone] = useState(false);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleSubmit = (event) => {
    isDone(true);
    event.preventDefault();
    console.log("Submitted");
    console.log(textInput);
    post("http://localhost:8000/api/v0/question", {
      query: textInput,
    }).then((resp) => {
      setResult(resp["answer"]);
      isDone(false);
    });
  };

  return (
    <form action="/" method="get">
      <div className="flexContainer">
        <TextField
          value={textInput}
          onChange={handleTextInputChange}
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Ask Your Questions Here"
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<BookmarkIcon />}
        />
      </div>
      <Grid align="center">
        {done ? (
          <>
            <br></br>
            <br></br>
            <CircularProgress />
          </>
        ) : (
          <></>
        )}
      </Grid>
      <Card variant="outlined" hidden={result == "" || done} fullwidth>
        {result}
      </Card>
    </form>
  );
};

export default Search;
