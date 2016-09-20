(function () {
	'use strict';

	const URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/files/web-audio-series/yodel.mp3';
	const context = new AudioContext();

	window.fetch(URL)
		.then(response => response.arrayBuffer())
		.then(arrayBuffer => context.decodeAudioData(arrayBuffer))
		.then(play);

	function play(audioBuffer) {
		const source = context.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(context.destination);
		source.start();
	}
}());