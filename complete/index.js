(function () {
	'use strict';

	class Instrument {
		constructor(audioContext) {
			this.audioContext = audioContext;
		}

		enqueue() {
			throw new Error('Enqueue not implemented!');
		}
	}

	class KickDrum extends Instrument {
		constructor(audioContext) {
			super(audioContext);
		}

		enqueue(startTime) {
			const { currentTime } = this.audioContext;
			const time = currentTime + startTime;
			const oscillator = this.audioContext.createOscillator();
			const gainNode = this.audioContext.createGain();

			oscillator.type = 'triangle';
			oscillator.frequency.value = 15;
			gainNode.gain.setValueAtTime(7, time);
			gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

			oscillator.connect(gainNode);
			gainNode.connect(this.audioContext.destination);
			oscillator.start(time);
		}
	}

	class Bass extends Instrument {
		constructor(audioContext) {
			super(audioContext);
		}

		enqueue(startTime, frequency) {
			const { currentTime } = this.audioContext;
			const time = currentTime + startTime;
			const oscillator = this.audioContext.createOscillator();
			const gainNode = this.audioContext.createGain();

			oscillator.type = 'triangle';
			oscillator.frequency.value = frequency;
			gainNode.gain.setValueAtTime(0.4, time);
			gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);

			oscillator.connect(gainNode);
			gainNode.connect(this.audioContext.destination);
			oscillator.start(time);
		}
	}

	class Lead extends Instrument {
		constructor(audioContext) {
			super(audioContext);
		}

		enqueue(startTime, frequency) {
			const { currentTime } = this.audioContext;
			const time = currentTime + startTime;
			const oscillator = this.audioContext.createOscillator();
			const gainNode = this.audioContext.createGain();

			oscillator.type = 'square';
			oscillator.frequency.value = frequency;
			gainNode.gain.setValueAtTime(0.1, time);

			oscillator.connect(gainNode);
			gainNode.connect(this.audioContext.destination);
			oscillator.start(time);
			oscillator.stop(time + 0.1);
		}
	}

	const audioContext = new AudioContext();

	const kickDrum = new KickDrum(audioContext);
	const bass = new Bass(audioContext);
	const lead = new Lead(audioContext);

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

	lead.enqueue(0, 392);
	lead.enqueue(0.5, 392);
	lead.enqueue(0.75, 392);
	lead.enqueue(0.9, 392);
	lead.enqueue(1.1, 392);
	lead.enqueue(1.25, 392);
	lead.enqueue(1.5, 440);
	lead.enqueue(1.75, 493.88);
	lead.enqueue(2, 392);
	lead.enqueue(2.5, 392);
	lead.enqueue(2.75, 392);
	lead.enqueue(2.9, 392);
	lead.enqueue(3.1, 392);
	lead.enqueue(3.25, 392);
	lead.enqueue(3.5, 440);
	lead.enqueue(3.75, 493.88);
	lead.enqueue(4, 392);
	lead.enqueue(4.5, 392);
	lead.enqueue(4.75, 392);
	lead.enqueue(4.9, 392);
	lead.enqueue(5.1, 392);
	lead.enqueue(5.25, 392);
	lead.enqueue(5.5, 440);
	lead.enqueue(5.75, 493.88);
	lead.enqueue(6, 523.25);
	lead.enqueue(6.5, 493.88);
	lead.enqueue(7, 440);
	lead.enqueue(7.5, 493.88);
}());