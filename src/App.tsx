import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Message } from "./Message";
import UserInput from "./UserInput";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const titleStyle = {
    fontFamily: "Times New Roman, sans-serif",
    fontSize: "55px",
    fontWeight: "bold",
    color: "white",
    paddingBottom: 80,
    paddingTop: 80,
  };

  const [messages, setMessages] = useState<Message[]>([]);

  // sends message to the server when this user hits post button
  const addMessage = (newMessage: Message) => {
    socket.emit("send_message", newMessage);
  };

  // listens for incoming messages from the server
  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("all_messages", (messages) => {
      setMessages(messages);
    });

    return () => {
      socket.off("receive_message");
      socket.off("all_messages");
    };
  }, [socket]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${require("./images/background.jpeg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography style={titleStyle}>The Community Chat</Typography>
      <Paper
        elevation={5}
        style={{
          padding: "15px",
          borderRadius: "15px",
          background: "white",
          height: "60%",
          width: "80%",
        }}
      >
        <UserInput onPost={addMessage} />
        {messages.map((message, index) => (
          <div key={index}>
            <Typography>{message.user}</Typography>
            <Typography>{message.message}</Typography>
            <Typography>
              {message.time ? message.time.toString() : "N/A"}
            </Typography>
            <hr />
          </div>
        ))}
      </Paper>
    </div>
  );
}

export default App;
