(function () {
	'use strict';

	const URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/files/web-audio-series/yodel.mp3';

	window.fetch(URL)
		.then(response => response.arrayBuffer());
}());