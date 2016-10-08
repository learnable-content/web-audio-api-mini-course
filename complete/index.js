(function () {
    'use strict';

    const IR_URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/files/web-audio-series/small-drum-room-ir.mp3';

    const context = new AudioContext();
    const recordButton = document.querySelector('.record');

    const initialPromises = [
        fetchAsArrayBuffer(IR_URL),
        navigator.mediaDevices.getUserMedia({ audio: true })
    ];

    Promise.all(initialPromises)
        .then(onReady);

    function onReady(responses) {
        const [ irArrayBuffer, mediaStream ] = responses;

        recordButton.onclick = () => {
            record(mediaStream)
                .then(data => new Blob(data))
                .then(blob => URL.createObjectURL(blob))
                .then(fetchAsArrayBuffer)
                .then(arrayBuffer => Promise.all([
                    context.decodeAudioData(arrayBuffer),
                    context.decodeAudioData(irArrayBuffer)
                ]))
                .then(play);
        };
    }

    function record(mediaStream) {
        return new Promise(resolve => {
            const mediaRecorder = new MediaRecorder(mediaStream);
            const data = [];

            mediaRecorder.ondataavailable = e => e.data.size && data.push(e.data);
            mediaRecorder.start();
            mediaRecorder.onstop = () => resolve(data);

            recordButton.textContent = 'Play';
            recordButton.onclick = () => mediaRecorder.stop();
        });
    }

    function fetchAsArrayBuffer(url) {
        return fetch(url)
            .then(response => response.arrayBuffer());
    }

    function play(buffers) {
        const [ sourceBuffer, irBuffer ] = buffers;
        const sourceNode = context.createBufferSource();
        const biquadFilterNode = context.createBiquadFilter();
        const convolverNode = context.createConvolver();

        sourceNode.buffer = sourceBuffer;
        sourceNode.detune.value = -350;

        biquadFilterNode.type = 'highpass';
        biquadFilterNode.frequency.value = 800;

        convolverNode.buffer = irBuffer;

        connectNodes(
            sourceNode,
            convolverNode,
            biquadFilterNode,
            context.destination
        );

        sourceNode.start();
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