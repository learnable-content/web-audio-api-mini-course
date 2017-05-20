(function () {
    'use strict';

    const SHARP_MODIFIER = 'keyboard__key--sharp';

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
            this.targetElement = targetElement;
            this.keyTemplate = keyTemplate.content.firstElementChild;
        }

        render() {
            for (let { note, frequency } of notes) {
                const key = this.keyTemplate.cloneNode(true);
                key.dataset.frequency = frequency;
                key.textContent = note;
                key.classList.add(note.includes('#') ? SHARP_MODIFIER : null);
                this.targetElement.appendChild(key);
            }
        }
    }

    window.APP.Keyboard = Keyboard;
}());