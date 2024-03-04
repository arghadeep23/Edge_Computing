const express = require('express');
const app = express();
const socketio = require('socket.io');
const path = require('path');
app.use(express.static(path.resolve(__dirname, 'client')));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});
const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
const io = socketio(server)

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log(`New message from ${socket.id}: ${data}`);
    })
    // box 1 to server
    socket.on('ctos1', (data) => {
        console.log('Box1 to Box2 data ', data);
        // server to box 2
        socket.emit('stoc2', data)
    })
    // box 2 to server
    socket.on('ctos2', (data) => {
        console.log('Box2 to Box1 data ', data);
        // server to box 1
        socket.emit('stoc1', data);
    })
})