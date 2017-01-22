(function () {
	'use strict';

	class Instrument {
		constructor(audioContext) {
			this.audioContext = audioContext;
			this.oscillator = audioContext.createOscillator();
			this.gainNode = audioContext.createGain();
			this.oscillator.frequency.value = 0;
			this.endNode = this.gainNode;

			this.oscillator.connect(this.gainNode);
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

		enqueueRest(startTime) {
			this.oscillator.frequency.setValueAtTime(startTime, 0);
		}

		connect(node) {
			this.endNode.connect(node);
		}
	}

	class KickDrum extends Instrument {
		constructor(audioContext) {
			super(audioContext);

			this.oscillator.type = 'triangle';
		}

		enqueue(startTime) {
			const { currentTime } = this.audioContext;
			const time = currentTime + startTime;

			this.oscillator.frequency.setValueAtTime(15, time);
			this.gainNode.gain.setValueAtTime(7, time);
			this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
		}
	}

	class Bass extends Instrument {
		constructor(audioContext) {
			super(audioContext);

			this.oscillator.type = 'triangle';
		}

		enqueue(startTime, frequency) {
			const { currentTime } = this.audioContext;
			const time = currentTime + startTime;

			this.oscillator.frequency.setValueAtTime(frequency, time);
			this.gainNode.gain.setValueAtTime(0.4, time);
			this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
		}
	}

	const audioContext = new AudioContext();
	// const lead = createOscillator('square');
	// const bass = createOscillator('triangle');
	// const bassDrum = createBassDrum();

	const kickDrum = new KickDrum(audioContext);
	const bass = new Bass(audioContext);

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

	bass.enqueue(0, 98);
	bass.enqueue(0.25, 98);
	bass.enqueue(1.25, 130.81);
	bass.enqueue(1.75, 123.47);
	bass.enqueue(2, 98);
	bass.enqueue(2.25, 98);
	bass.enqueue(3.25, 130.81);
	bass.enqueue(3.75, 123.47);
	bass.enqueue(4, 130.81);
	bass.enqueue(4.25, 130.81);
	bass.enqueue(5.25, 174.61);
	bass.enqueue(5.75, 164.81);
	bass.enqueue(6, 130.81);
	bass.enqueue(6.25, 130.81);
	bass.enqueue(7.25, 130.81);
	bass.enqueue(7.75, 123.47);


	kickDrum.connect(audioContext.destination);
	bass.connect(audioContext.destination);

	kickDrum.start();
	bass.start();

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