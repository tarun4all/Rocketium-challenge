const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});
const tempDB = {
    master: "",
    slaves: [],
}
let c = 1;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    if (!tempDB.master) {
        io.emit('master', 'Please select avatar');
    }
    io.to(socket.id).emit("welcome", { allowedToSend: false });

    socket.on('setAvatar', () => {
        if (tempDB.master) {
            io.to(socket.id).emit("error", 'Not allowed');
        } else {
            tempDB.master = socket.id;
            io.to(socket.id).emit("welcome", { allowedToSend: true });
        }
    });
    socket.on('sendMsg', (msg) => {
        console.log(msg);
        io.emit('master', 'Please select avatar');
    });
});

http.listen(8000, () => {
    console.log('listening on *:8000');
});