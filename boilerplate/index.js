(function () {
    'use strict';

    const IR_URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/files/web-audio-series/small-drum-room-ir.mp3';

    const context = new AudioContext();
    const recordButton = document.querySelector('.record');

    const initialPromises = [
        fetchAsArrayBuffer(IR_URL)
    ];

    Promise.all(initialPromises)
        .then(onReady);

    function onReady(responses) {
        const [ irArrayBuffer ] = responses;

        recordButton.onclick = () => {
            record();
        };
    }

    function record(mediaStream) {
        recordButton.textContent = 'Play';
    }

    function fetchAsArrayBuffer(url) {
        return fetch(url)
            .then(response => response.arrayBuffer());
    }

    function connectNodes(firstNode, ...remainingNodes) {
        const secondNode = remainingNodes[0];

        if (!firstNode || !secondNode) {
            return;
        }

        firstNode.connect(secondNode);
        connectNodes(...remainingNodes);
    }
}());