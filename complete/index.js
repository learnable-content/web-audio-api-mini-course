(function () {
	'use strict';

	const { Keyboard } = window.APP;

	const keyboard = new Keyboard(
		document.body.querySelector('.keyboard'),
		document.body.querySelector('#key-template')
	);

	keyboard.render();
	keyboard.registerEventHandlers();
	keyboard.focus();
}());