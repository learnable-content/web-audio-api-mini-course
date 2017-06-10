(function () {
	'use strict';

	const { Keyboard, Drums, Recorder } = window.APP;
	const context = new AudioContext();

	const keyboard = new Keyboard(
		context,
		document.body.querySelector('.keyboard'),
		document.body.querySelector('#key-template')
	);

	const drums = new Drums(
		context,
		document.body.querySelector('.drums'),
		document.body.querySelector('#drum-loop-template')
	);

	const recorder = new Recorder(
		context,
		document.body.querySelector('.recorder'),
		document.body.querySelector('#recording-template'),
		keyboard,
		drums
	);
}());