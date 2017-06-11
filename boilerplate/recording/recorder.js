(function () {
    'use strict';

    const { MediaStreamCapturer, Recording } = window.APP;

    const RECORD_TEXT = 'Record';
    const STOP_TEXT = 'Stop';

    class Recorder {
        constructor(context, container, recordingTemplate, ...sources) {
            this.context = context;
            this.container = container;
            this.recordingTemplate = recordingTemplate.content.firstElementChild;
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

            mediaStreamCapturer.start()
                .then(
                    audioBuffers => new Recording(
                        this.context,
                        audioBuffers,
                        this.recordingTemplate,
                        this.recordingsContainer
                    )
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
    }

    window.APP.Recorder = Recorder;
}());