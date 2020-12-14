const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});
const tempDB = {
    defaultAvatar: '',
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

    socket.on('setAvatar', (avatar) => {
        if (tempDB.master) {
            io.to(socket.id).emit("error", 'Not allowed');
        } else {
            tempDB.master = socket.id;
            tempDB.defaultAvatar = avatar;
            io.to(socket.id).emit("welcome", { allowedToSend: true });
            io.emit('avatarSelected', null);
        }
    });
    socket.on('sendMsg', (msg) => {
        io.emit('msg', { msg, avatar: tempDB.defaultAvatar, sendBy: socket.id, time: new Date() });
    });
    socket.on('disconnect', () => {
        if (tempDB.master == socket.id) {
            tempDB.master = '';
            io.emit('master', 'Please select avatar');
        }
        console.log('user disconnected');
    });
});

http.listen(8000, () => {
    console.log('listening on *:8000');
});