function connect() {
    const socket = io('/');
    const peer = new Peer(undefined, {
        host: '/',
        port: 8080
    });
    const roomID = document.getElementById("room-name").value;

    peer.on('call', call => {
        call.answer(new MediaStream());

        call.on('stream', stream => {
            setAudioStream(stream);
        })
    });

    function setAudioStream(stream) {
        const audioEl = document.getElementById('sender-audio');
        audioEl.srcObject = stream;
        audioEl.play();
        document.querySelector('.prompt').style.display = "none";
        document.querySelector('.streaming').style.display = "flex";
    }

    peer.on('open', id => {
        socket.emit('join-room', roomID, id, 2);
    });
}
