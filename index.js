const express = require('express');
const { v4 } = require('uuid');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ip = require('ip');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
    <center>
        <h1>Audio Streaming</h1>
        <a href="/sender">Send audio</a><br/>
        <a href="/receiver">Receive audio</a>
    </center>
    `)
});

app.get('/sender', (req, res) => {
    res.render("sender", {
        ID: v4()
    });
    res.end();
});

app.get('/receiver', (req, res) => {
    res.render("receiver", {
        ID: v4()
    });
    res.end();
});

io.on('connection', socket => {
    socket.on('join-room', (roomid, peerid, type) => {
        socket.join(roomid);
        socket.to(roomid).broadcast.emit(type === 1 ? "sender-connected" : "receiver-connected", peerid);

        socket.on('disconnect', () => {
            socket.to(roomid).broadcast.emit(type === 1 ? "sender-disconnected" : "receiver-disconnected", peerid);
        });
    });
});

console.log(`Running at ${ip.address()}:3000`);
server.listen(3000);


const fs = require('fs');
const { PeerServer } = require('peer');

const peerServer = PeerServer({
  port: 8080,
  ssl: {
    key: fs.readFileSync('c:/dd/virtual_machine/SSL/cyberiaonline/ssl/key.key'),
    cert: fs.readFileSync('c:/dd/virtual_machine/SSL/cyberiaonline/ssl/crt.crt')
  }
});

















//end
