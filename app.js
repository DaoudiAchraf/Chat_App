const express = require('express');
const path = require('path');
const http = require('http');
const socketio =require('socket.io');

const app = express();

app.use(express.static(path.join(__dirname,'public')));

const PORT = 4000 || process.env.PORT;
 
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',socket =>{
    console.log('new socket connection ...');

    socket.emit('message','welcome ,lets chat'); //to a single client

    socket.broadcast.emit('message','New user joined the chat'); // to all the clients except the new one

    socket.on('disconnect',()=>{
        io.emit('message','a user has disconnected');
    });

   // io.emit(); // broadcast to all
});


server.listen(PORT,()=>console.log(`server running on port ${PORT}` ));