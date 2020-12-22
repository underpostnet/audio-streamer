function connect() {
    const socket = io('/');
    const peer = new Peer(undefined, {
        host: '/',
        port: 8080
    });

    const roomID = document.getElementById("room-name").value;

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        document.querySelector('.prompt').style.display = "none";
        document.querySelector('.streaming').style.display = "flex";
        socket.on('receiver-connected', id => {
            peer.call(id, stream);
        });
    });

    peer.on('open', id => {
        socket.emit('join-room', roomID, id, 1);
    });
}
