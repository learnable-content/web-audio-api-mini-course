(function () {
    'use strict';

    const SHARP_MODIFIER = 'keyboard__key--sharp';
    const TWELTH_ROOT_OF_TWO = 1.059463094359
    const SEMITONES_PER_OCTAVE = 12;
    const DEFAULT_OCTAVE = 4;
    const DEFAULT_GAIN = 0.5;

    const notes = new Map([
		['C', 16.35],
		['C#', 17.32],
		['D', 18.35],
		['D#', 19.45],
		['E', 20.60],
		['F', 21.83],
		['F#', 23.12],
		['G', 24.50],
		['G#', 25.96],
		['A', 27.50],
		['A#', 29.14],
		['B', 30.87]
	]);

    class Keyboard {
        constructor(targetElement, keyTemplate) {
            this.context = new AudioContext();
            this.targetElement = targetElement;
            this.keyContainer = targetElement.querySelector('.keyboard__keys');
            this.gainControl = targetElement.querySelector('.keyboard__control-input--gain');
            this.octaveControl = targetElement.querySelector('.keyboard__control-input--octave');
            this.keyTemplate = keyTemplate.content.firstElementChild;
            this.octave = DEFAULT_OCTAVE;
            this.gain = DEFAULT_GAIN;
            this.oscillatorNode = null;
        }

        render() {
            for (let [note, frequency] of notes) {
                const key = this.keyTemplate.cloneNode(true);

                key.textContent = note;
                key.dataset.frequency = frequency;

                if (note.includes('#')) key.classList.add(SHARP_MODIFIER);

                this.keyContainer.appendChild(key);
            }
        }

        registerEventHandlers() {
            const { keyContainer, gainControl, octaveControl } = this;

            keyContainer.onmousedown = this.createKeyClickHandler();
            keyContainer.onmouseup = () => this.stop();
            keyContainer.onmouseleave = () => this.stop();
            gainControl.onchange = this.createGainChangeHandler();
            octaveControl.onchange = this.createOctaveChangeHandler();
        }

        createKeyClickHandler() {
            return event => {
                if (event.button !== 0) return;

                const { frequency } = event.target.dataset;
                this.play(frequency);
            };
        }

        createGainChangeHandler() {
            return event => this.gain = this.gainControl.value / 100;
        }

         createOctaveChangeHandler() {
            return event => {
                this.octave = Number.parseInt(this.octaveControl.value) + 1;
            }
        }

        play(frequency) {
            const oscillatorNode = this.context.createOscillator();
            const gainNode = this.context.createGain();

            oscillatorNode.frequency.value = this.calculateFrequency(frequency);
            oscillatorNode.type = 'square';

            gainNode.gain.value = this.gain;

            oscillatorNode.connect(gainNode);
            gainNode.connect(this.context.destination);
            oscillatorNode.start();

            this.oscillatorNode = oscillatorNode;
        }

        stop() {
            if (this.oscillatorNode) {
                this.oscillatorNode.stop();
            }
        }

        calculateFrequency(frequency) {
            return frequency * Math.pow(TWELTH_ROOT_OF_TWO, SEMITONES_PER_OCTAVE * this.octave);
        }

        focus() {
            this.targetElement.focus();
        }
    }

    window.APP.Keyboard = Keyboard;
}());