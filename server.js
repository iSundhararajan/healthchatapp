const express = require('express');
const path = require('path');
const http = require("http");
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Set static folder
app.use(express.static(path.join(__dirname, 'layout')))

//Run when client connects
io.on('connection', socket => {
    console.log("New connection....")

    //Only displays the user who is connected, Runs when user connects
    socket.emit('message','Welcome to ChatCord!');

    //Shown to everyone except the user itself, Runs when user connects
    socket.broadcast.emit('message','A user has joined the chat');

    //Runs when user disconnects
    socket.on('disconnect',()=>{
        //Shown to everyone including the user
        io.emit('message','A user has left the chat')
    });


    //Listen for chat message
    socket.on('chatMessage', msg =>{
        //Shown to everyone including the user
        io.emit('message', msg)
    });
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running on ${PORT}`));

