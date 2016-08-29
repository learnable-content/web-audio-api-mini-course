(function () {
	'use strict';

	const PIANO_URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/web-audio-series/files/piano.mp3';
	const IR_URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/web-audio-series/files/ir.mp3';

	const context = new AudioContext();
	
	const bufferPromise = Promise.all([
		downloadAsAudioBuffer(PIANO_URL),
		downloadAsAudioBuffer(IR_URL)
	]);

	bufferPromise.then(play);

	function downloadAsAudioBuffer(url) {
		return window.fetch(url)
				.then(response => response.arrayBuffer())
				.then(arrayBuffer => context.decodeAudioData(arrayBuffer));
	}

	function play(audioBuffers) {
		const [ pianoBuffer, irBuffer ] = audioBuffers;
		const pianoNode = context.createBufferSource();
		const gainNode = context.createGain();
		const pannerNode = context.createStereoPanner();
		const biquadFilterNode = context.createBiquadFilter();
		const convolverNode = context.createConvolver();

		pianoNode.buffer = pianoBuffer;

		gainNode.gain.setValueAtTime(0.01, context.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.4, context.currentTime + 1.6);

		pannerNode.pan.setValueAtTime(-1, context.currentTime + 0.1);
		pannerNode.pan.linearRampToValueAtTime(0.4, context.currentTime + 1.5);

		biquadFilterNode.type = 'lowpass';
		biquadFilterNode.frequency.setValueAtTime(20, context.currentTime + 1);
		biquadFilterNode.frequency.exponentialRampToValueAtTime(500, context.currentTime + 2);

		convolverNode.buffer = irBuffer;

		connectNodes(pianoNode, gainNode);
		connectNodes(gainNode, pannerNode);
		connectNodes(pannerNode, biquadFilterNode);
		connectNodes(biquadFilterNode, convolverNode);
		connectNodes(convolverNode);

		pianoNode.start();
	}

	function connectNodes(firstNode, secondNode = context.destination) {
		firstNode.connect(secondNode);
	}
}());