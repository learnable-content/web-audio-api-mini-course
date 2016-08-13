(function () {
	'use strict';

	const URL = 'https://ia801406.us.archive.org/6/items/SwissYodelCall/Track17.mp3';

	window.fetch(URL)
		.then(response => response.arrayBuffer());
}());