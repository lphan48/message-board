import { Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Message } from "./Message";
import UserInput from "./UserInput";
import io from "socket.io-client";
import PaginationButtons from "./PaginationButtons";

const socket = io("https://c4c-messages-5b86498aee2e.herokuapp.com/");

function App() {
  const titleStyle = {
    fontFamily: "Times New Roman, sans-serif",
    fontSize: "55px",
    fontWeight: "bold",
    color: "white",
    paddingBottom: 50,
    paddingTop: 50,
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

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(messages.length / 5);
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const messagesToDisplay = messages.slice(startIndex, endIndex).reverse();

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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
          padding: "10px",
          borderRadius: "15px",
          background: "white",
          height: "70%",
          width: "80%",
        }}
      >
        <UserInput onPost={addMessage} />
        {messagesToDisplay.map((message, index) => (
          <div key={index}>
            <Typography
              fontSize="14px"
              marginLeft={3}
              style={{ marginTop: index === 0 ? "30px" : 0 }}
              color="black"
            >
              {message.user}
            </Typography>
            <Typography fontSize="14px" marginLeft={3} color="gray">
              {message.message}
            </Typography>
            <Typography
              fontSize="12px"
              marginLeft={3}
              marginBottom={1}
              color="gray"
            >
              {message.time ? message.time.toString() : "N/A"}
            </Typography>
            <div
              style={{
                width: "98%",
                height: "1px",
                backgroundColor: "lightgray", // Adjust the color as needed
                marginBottom: "8px", // Adjust the spacing between messages
                marginLeft: "10px",
              }}
            />
          </div>
        ))}

        {messages.length > 0 && (
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        )}
      </Paper>
    </div>
  );
}

export default App;
