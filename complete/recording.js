(function () {
    'use strict';

    class Recording {
        constructor(context, audioBuffers, recordingTemplate, recordingsContainer) {
            this.context = context;
            this.audioBuffers = audioBuffers;
            console.log(audioBuffers);
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
            const mergeNode = this.context.createChannelMerger(this.audioBuffers.length);

            mergeNode.connect(this.context.destination);

            for (let audioBuffer of this.audioBuffers) {
                const bufferSource = this.context.createBufferSource();
                bufferSource.buffer = audioBuffer;
                bufferSource.connect(mergeNode);
                bufferSource.start();
            }
        }
    }

    window.APP.Recording = Recording;
}());