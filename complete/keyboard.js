(function () {
    'use strict';

    const SHARP_MODIFIER = 'keyboard__key--sharp';
    const DEFAULT_OCTAVE = 4;

    const notes = [
		{ note: 'C', frequency: '16.35' },
		{ note: 'C#', frequency: '17.32' },
		{ note: 'D', frequency: '18.35' },
		{ note: 'D#', frequency: '19.45' },
		{ note: 'E', frequency: '20.60' },
		{ note: 'F', frequency: '21.83' },
		{ note: 'F#', frequency: '23.12' },
		{ note: 'G', frequency: '24.50' },
		{ note: 'G#', frequency: '25.96' },
		{ note: 'A', frequency: '27.50' },
		{ note: 'A#', frequency: '29.14' },
		{ note: 'B', frequency: '30.87' }
	];

    class Keyboard {
        constructor(targetElement, keyTemplate) {
            this.context = new AudioContext();
            this.targetElement = targetElement;
            this.keyTemplate = keyTemplate.content.firstElementChild;
            this.octave = DEFAULT_OCTAVE;
        }

        render() {
            for (let { note, frequency } of notes) {
                const key = this.keyTemplate.cloneNode(true);
                const { play, stop } = this.createEventHandlers(frequency);

                key.textContent = note;
                key.classList.add(note.includes('#') ? SHARP_MODIFIER : null);
                key.onmousedown = play;
                key.onmouseup = stop;

                this.targetElement.appendChild(key);
            }
        }

        createEventHandlers(frequency) {
            let oscillatorNode;

            return {
                play: () => {
                    oscillatorNode = this.context.createOscillator();
                    oscillatorNode.frequency.value = frequency * this.octave;
                    oscillatorNode.type = 'square';
                    oscillatorNode.connect(this.context.destination);
                    oscillatorNode.start();
                },

                stop: () => oscillatorNode.stop()
            };
        }
    }

    window.APP.Keyboard = Keyboard;
}());