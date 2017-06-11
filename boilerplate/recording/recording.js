(function () {
    'use strict';

    class Recording {
        constructor(context, audioBuffers, recordingTemplate, recordingsContainer) {
            this.context = context;
            this.audioBuffers = audioBuffers;
            this.recordingTemplate = recordingTemplate;
            this.recordingsContainer = recordingsContainer;

            this.render();
        }

        render() {
            const recording = this.recordingTemplate.cloneNode(true);
            const recordingNumber = this.recordingsContainer.childElementCount + 1;

            recording.textContent = `Recording #${recordingNumber}`;
            recording.onclick = () => this.play();

            this.recordingsContainer.appendChild(recording);
        }

        play() {

        }
    }

    window.APP.Recording = Recording;
}());