import { Button, TextField, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import { Message } from "./Message";

type UserInputProps = {
  onPost: (newMessage: Message) => void;
};

function UserInput({ onPost }: UserInputProps) {
  const [userValue, setUserValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const labelStyle = {
    fontSize: "17px",
    color: "gray",
    marginTop: 15,
  };

  const handleUserChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setUserValue(e.target.value);
  };

  const handleMessageValue = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessageValue(e.target.value);
  };

  const handlePostClick = () => {
    const newMessage: Message = {
      user: userValue,
      message: messageValue,
      time: new Date(),
    };

    onPost(newMessage);

    setUserValue("");
    setMessageValue("");
  };

  return (
    <div className="TextField">
      <div
        className="UserName"
        style={{ display: "flex", marginBottom: 5, marginLeft: 20 }}
      >
        <Typography style={labelStyle}>Your name:</Typography>
        <TextField
          sx={{ m: 1, width: "45ch", marginBottom: "0px" }}
          id="outlined-basic"
          variant="outlined"
          color="secondary"
          inputProps={{ maxLength: 128 }}
          value={userValue}
          onChange={handleUserChange}
          size="small"
          label="(leave blank to be anonymous)"
        />
      </div>
      <div
        className="UserText"
        style={{ display: "flex", marginBottom: 5, marginLeft: 20 }}
      >
        <Typography style={labelStyle}>Your message:</Typography>
        <TextField
          sx={{ m: 1, width: "110ch", marginTop: "0px" }}
          id="outlined-basic"
          variant="outlined"
          color="secondary"
          inputProps={{ maxLength: 128 }}
          value={messageValue}
          onChange={handleMessageValue}
          size="small"
        />
        <Button
          style={{
            borderRadius: 15,
            backgroundColor: "#fab5d1",
            fontSize: "16px",
            marginTop: "10px",
            marginLeft: "10px",
          }}
          variant="contained"
          onClick={handlePostClick}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default UserInput;
