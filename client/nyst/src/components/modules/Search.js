import React, { useEffect, useState } from "react";

import "./Player.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import BookmarkIcon from "@material-ui/icons/Search";

const Search = () => {
  const { strings } = require("../pages/Video.js");
  const [textInput, setTextInput] = useState("");

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
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
          onClick={() => console.log(strings.slice(-1)[0])}
          variant="contained"
          startIcon={<BookmarkIcon />}
        />
      </div>
    </form>
  );
};

export default Search;
