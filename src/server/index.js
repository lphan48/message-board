const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());

// creates the server and socket
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "https://c4c-messages-5b86498aee2e.herokuapp.com/",
        methods: ["GET", "POST"],
    },
})

// establishes a connection to the db
function getDBConnection() {
    return new sqlite3.Database('messages.db');
}

// create the messages table if it doesn't exist
function createMessagesTable() {
    const db = getDBConnection();
    db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            message TEXT,
            time INTEGER
        )
    `);
    db.close();
}

createMessagesTable();


io.on("connection", (socket) => {
    console.log("someone connected! :D");

    // sends all messages to the newly connected client
    const db = getDBConnection();
    db.all('SELECT * FROM messages', (err, messages) => {
        if (!err) {
            socket.emit('all_messages', messages);
        }
        db.close();
    });

    // when a message is sent from the client, store it in the db and broadcast to all clients
    socket.on('send_message', (message) => {
        const { user, message : msg, time } = message;
        const db = getDBConnection();

        db.run('INSERT INTO messages (user, message, time) VALUES (?, ?, ?)', [user, msg, time], (err) => {
            if (err) {
                console.error(err);
            } else {
                io.emit('receive_message', message);
            }
            db.close();
        });
    });
})

server.listen(process.env.PORT || 3001, () => {
    console.log("server is running! :D")
})