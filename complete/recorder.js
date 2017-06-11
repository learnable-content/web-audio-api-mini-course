(function () {
    'use strict';

    const { MediaStreamCapturer } = window.APP;

    const RECORD_TEXT = 'Record';
    const STOP_TEXT = 'Stop';

    class Recorder {
        constructor(context, container, mediaTemplate, ...sources) {
            this.context = context;
            this.container = container;
            this.mediaTemplate = mediaTemplate.content.firstElementChild;
            this.recordingsContainer = container.querySelector('.recorder__recordings');
            this.button = container.querySelector('.recorder__record');
            this.sources = sources;

            this.prepareUiForRecording();
        }

        record() {
            this.prepareUiForStopping();

            const mediaStreamCapturer = new MediaStreamCapturer(
                this.context,
                ...this.sources
            );

            mediaStreamCapturer.start().then(
                audioBuffers => this.mergeAudioBuffers(audioBuffersblob)
            );

            this.button.onclick = () => {
                mediaStreamCapturer.stop();
                this.prepareUiForRecording();
            };
        }

        prepareUiForRecording() {
            this.button.textContent = RECORD_TEXT;
            this.button.onclick = () => this.record();
        }

        prepareUiForStopping() {
            this.button.textContent = STOP_TEXT;
        }

        mergeAudioBuffers(audioBuffers) {

        }

        createMediaElementForBlob(blob) {
            const mediaElement = this.mediaTemplate.cloneNode(true);
            mediaElement.src = URL.createObjectURL(blob);
            this.recordingsContainer.appendChild(mediaElement);
        }
    }

    window.APP.Recorder = Recorder;
}());