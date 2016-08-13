(function () {
	'use strict';

	const URL = 'https://ia801406.us.archive.org/6/items/SwissYodelCall/Track17.mp3';
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