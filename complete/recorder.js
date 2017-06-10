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

            this.button.textContent = RECORD_TEXT;
            this.button.onclick = () => this.record();
        }

        record() {
            this.prepareUiForStopping();

            const destination = this.context.createMediaStreamDestination();
            const mediaStreamCapturer = new MediaStreamCapturer(destination.stream);

            for (let source of this.sources) {
                source.connect(destination);
            }

            const stopRecording = mediaStreamCapturer.start();
            this.prepareForRecordingEnd(stopRecording);
        }

        prepareUiForRecording() {
            this.button.textContent = RECORD_TEXT;
        }

        prepareUiForStopping() {
            this.button.textContent = STOP_TEXT;
        }

        prepareForRecordingEnd(stopRecording) {
            this.button.onclick = () => {
                const blob = stopRecording();
                this.createMediaElementForBlob(blob);
                this.prepareUiForRecording();
            };
        }

        createMediaElementForBlob(blob) {
            const mediaElement = this.mediaTemplate.cloneNode(true);
            mediaElement.src = URL.createObjectURL(blob);
            this.recordingsContainer.appendChild(mediaElement);
        }
    }

    window.APP.Recorder = Recorder;
}());