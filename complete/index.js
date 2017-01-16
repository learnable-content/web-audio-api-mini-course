(function () {
	'use strict';

	const audioContext = new AudioContext();
	const lead = createOscillator('square');
	const bass = createOscillator('triangle');
	const bassDrum = createOscillator('triangle');

	lead.connect(audioContext.destination);
	lead.start();


	enqueueFrequency(lead, 392, 0);
	enqueueFrequency(lead, 0, 0.23);
	enqueueFrequency(lead, 392, 0.25);
	enqueueFrequency(lead, 0, 0.48);
	enqueueFrequency(lead, 392, 0.5);
	enqueueFrequency(lead, 0, 0.63);
	enqueueFrequency(lead, 392, 0.65);
	enqueueFrequency(lead, 0, 0.85);
	enqueueFrequency(lead, 392, 0.87);
	enqueueFrequency(lead, 0, 1.09);
	enqueueFrequency(lead, 392, 1.1);
	enqueueFrequency(lead, 0, 1.26);
	enqueueFrequency(lead, 440, 1.28);
	enqueueFrequency(lead, 0, 1.48);
	enqueueFrequency(lead, 493.88, 1.5)

	setTimeout(() => lead.stop(), 2000);

	function createOscillator(type) {
		const oscillatorNode = audioContext.createOscillator();
		oscillatorNode.type = type;
		return oscillatorNode;
	}

	function enqueueFrequency(oscillatorNode, frequency, time) {
		oscillatorNode.frequency.setValueAtTime(frequency, audioContext.currentTime + time);
	}
}());