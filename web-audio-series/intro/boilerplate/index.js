(function () {
	'use strict';

	const URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/web-audio-series/files/yodel.mp3';

	window.fetch(URL)
		.then(response => response.arrayBuffer());
}());