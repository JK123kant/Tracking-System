const express= require('express');
const app = express();

const soketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = soketio(server);
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
    socket.on('sendLocation', function (coords) {
        io.emit('receive-location', {id: socket.id, ...coords});
    });

    socket.on('disconnect', function () {
        io.emit('user-disconnected', socket.id);
    });
   
   });
app.get('/',function (req, res) {
    res.render('index');
});


server.listen(3000)

