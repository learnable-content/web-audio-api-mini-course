(function () {
	'use strict';

	const audioContext = new AudioContext();

	function enqueueKickDrum(startTime) {
		const { currentTime } = audioContext;
		const time = currentTime + startTime;
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.type = 'triangle';
		oscillator.frequency.value = 15;
		gainNode.gain.setValueAtTime(7, time);
		gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.start(time);
	}

	function enqueueBass(startTime, frequency) {
		const { currentTime } = audioContext;
		const time = currentTime + startTime;
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.type = 'triangle';
		oscillator.frequency.value = frequency;
		gainNode.gain.setValueAtTime(0.4, time);
		gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.start(time);
	}

	function enqueueLead(startTime, frequency) {
		const { currentTime } = audioContext;
		const time = currentTime + startTime;
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.type = 'square';
		oscillator.frequency.value = frequency;
		gainNode.gain.setValueAtTime(0.1, time);

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.start(time);
		oscillator.stop(time + 0.1);
	}

	enqueueKickDrum(0);
	enqueueKickDrum(0.5);
	enqueueKickDrum(1);
	enqueueKickDrum(1.5);
	enqueueKickDrum(2);
	enqueueKickDrum(2.5);
	enqueueKickDrum(3);
	enqueueKickDrum(3.5);
	enqueueKickDrum(4);
	enqueueKickDrum(4.5);
	enqueueKickDrum(5);
	enqueueKickDrum(5.5);
	enqueueKickDrum(6);
	enqueueKickDrum(6.5);
	enqueueKickDrum(7);
	enqueueKickDrum(7.5);

	enqueueBass(0, 98);
	enqueueBass(0.25, 98);
	enqueueBass(1.25, 130.81);
	enqueueBass(1.75, 123.47);
	enqueueBass(2, 98);
	enqueueBass(2.25, 98);
	enqueueBass(3.25, 130.81);
	enqueueBass(3.75, 123.47);
	enqueueBass(4, 130.81);
	enqueueBass(4.25, 130.81);
	enqueueBass(5.25, 174.61);
	enqueueBass(5.75, 164.81);
	enqueueBass(6, 130.81);
	enqueueBass(6.25, 130.81);
	enqueueBass(7.25, 130.81);
	enqueueBass(7.75, 123.47);

	enqueueLead(0, 392);
	enqueueLead(0.5, 392);
	enqueueLead(0.75, 392);
	enqueueLead(0.9, 392);
	enqueueLead(1.1, 392);
	enqueueLead(1.25, 392);
	enqueueLead(1.5, 440);
	enqueueLead(1.75, 493.88);
	enqueueLead(2, 392);
	enqueueLead(2.5, 392);
	enqueueLead(2.75, 392);
	enqueueLead(2.9, 392);
	enqueueLead(3.1, 392);
	enqueueLead(3.25, 392);
	enqueueLead(3.5, 440);
	enqueueLead(3.75, 493.88);
	enqueueLead(4, 392);
	enqueueLead(4.5, 392);
	enqueueLead(4.75, 392);
	enqueueLead(4.9, 392);
	enqueueLead(5.1, 392);
	enqueueLead(5.25, 392);
	enqueueLead(5.5, 440);
	enqueueLead(5.75, 493.88);
	enqueueLead(6, 523.25);
	enqueueLead(6.5, 493.88);
	enqueueLead(7, 440);
	enqueueLead(7.5, 493.88);
}());