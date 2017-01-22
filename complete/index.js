(function () {
	'use strict';

	class Instrument {
		constructor(audioContext) {
			this.audioContext = audioContext;
			this.oscillator = audioContext.createOscillator();
			this.oscillator.frequency.value = 0;
		}

		start() {
			this.oscillator.start();
		}

		stop() {
			this.oscillator.stop();
		}

		enqueue() {
			throw new Error('Enqueue not implemented!');
		}

		connect(node) {
			this.endNode.connect(node);
		}
	}

	class KickDrum extends Instrument {
		constructor(audioContext) {
			super(audioContext);

			const gainNode = audioContext.createGain();

			this.oscillator.type = 'triangle';
			this.oscillator.connect(gainNode);

			this.gainNode = gainNode;
			this.endNode = gainNode;
		}

		enqueue(startTime) {
			const { currentTime } = this.audioContext;

			this.oscillator.frequency.setValueAtTime(15, currentTime + startTime);
			this.gainNode.gain.setValueAtTime(7, currentTime + startTime);
			this.gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + startTime + 0.3);
		}
	}

	const audioContext = new AudioContext();
	// const lead = createOscillator('square');
	// const bass = createOscillator('triangle');
	// const bassDrum = createBassDrum();

	const kickDrum = new KickDrum(audioContext);

	kickDrum.enqueue(0);
	kickDrum.enqueue(0.5);
	kickDrum.enqueue(1);
	kickDrum.enqueue(1.5);
	kickDrum.enqueue(2);
	kickDrum.enqueue(2.5);
	kickDrum.enqueue(3);
	kickDrum.enqueue(3.5);
	kickDrum.enqueue(4);
	kickDrum.enqueue(4.5);
	kickDrum.enqueue(5);
	kickDrum.enqueue(5.5);
	kickDrum.enqueue(6);
	kickDrum.enqueue(6.5);
	kickDrum.enqueue(7);
	kickDrum.enqueue(7.5);


	kickDrum.connect(audioContext.destination);

	kickDrum.start();

	// enqueueFrequency(lead, 392, 0);
	// enqueueFrequency(lead, 0, 0.23);
	// enqueueFrequency(lead, 392, 0.25);
	// enqueueFrequency(lead, 0, 0.48);
	// enqueueFrequency(lead, 392, 0.5);
	// enqueueFrequency(lead, 0, 0.63);
	// enqueueFrequency(lead, 392, 0.65);
	// enqueueFrequency(lead, 0, 0.85);
	// enqueueFrequency(lead, 392, 0.87);
	// enqueueFrequency(lead, 0, 1.09);
	// enqueueFrequency(lead, 392, 1.1);
	// enqueueFrequency(lead, 0, 1.26);
	// enqueueFrequency(lead, 440, 1.28);
	// enqueueFrequency(lead, 0, 1.48);
	// enqueueFrequency(lead, 493.88, 1.5);
	// enqueueFrequency(lead, 0, 2);

	function createOscillator(type) {
		const oscillatorNode = audioContext.createOscillator();
		oscillatorNode.type = type;
		return oscillatorNode;
	}

	function enqueueFrequency(oscillatorNode, frequency, time) {
		oscillatorNode.frequency.setValueAtTime(frequency, audioContext.currentTime + time);
	}
}());