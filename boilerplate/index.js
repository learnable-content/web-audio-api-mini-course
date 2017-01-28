(function () {
	'use strict';

	const audioContext = new AudioContext();

	function enqueueKickDrum(startTime) {
		const { currentTime } = audioContext;
		const time = currentTime + startTime;
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
	}

	function enqueueBass([startTime, frequency]) {
		const { currentTime } = audioContext;
		const time = currentTime + startTime;
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		const pannerNode = audioContext.createStereoPanner();
	}

	function enqueueLead([startTime, frequency]) {
		const { currentTime } = audioContext;
		const time = currentTime + startTime;
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		const pannerNode = audioContext.createStereoPanner();
	}

	const kickSequence = [
		0,
		0.5,
		1,
		1.5,
		2,
		2.5,
		3,
		3.5,
		4,
		4.5,
		5,
		5.5,
		6,
		6.5,
		7,
		7.5
	];

	const bassSequence = [
		[0, 98],
		[0.25, 98],
		[1.25, 130.81],
		[1.75, 123.47],
		[2, 98],
		[2.25, 98],
		[3.25, 130.81],
		[3.75, 123.47],
		[4, 130.81],
		[4.25, 130.81],
		[5.25, 174.61],
		[5.75, 164.81],
		[6, 130.81],
		[6.25, 130.81],
		[7.25, 130.81],
		[7.75, 123.47]
	];

	const leadSequence = [
		[0, 392],
		[0.5, 392],
		[0.75, 392],
		[0.9, 392],
		[1.11, 392],
		[1.25, 392],
		[1.5, 440],
		[1.75, 493.88],
		[2, 392],
		[2.5, 392],
		[2.75, 392],
		[2.9, 392],
		[3.11, 392],
		[3.25, 392],
		[3.5, 440],
		[3.75, 493.88],
		[4, 392],
		[4.5, 392],
		[4.75, 392],
		[4.9, 392],
		[5.11, 392],
		[5.25, 392],
		[5.5, 440],
		[5.75, 493.88],
		[6, 523.25],
		[6.5, 493.88],
		[7, 440],
		[7.5, 493.88]
	];

	kickSequence.forEach(enqueueKickDrum);
	bassSequence.forEach(enqueueBass);
	leadSequence.forEach(enqueueLead);
}());