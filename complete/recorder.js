(function () {
    'use strict';

    const { MediaStreamCapturer } = window.APP;

    const RECORD_TEXT = 'Record';
    const STOP_TEXT = 'Stop';

    class Recorder {
        constructor(context, button, ...sources) {
            this.context = context;
            this.button = button;
            this.sources = sources;

            button.textContent = RECORD_TEXT;
            button.onclick = () => this.record();
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
                const recordingUrl = stopRecording();
                this.prepareUiForRecording();
                document.location.href = recordingUrl;
            };
        }
    }

    window.APP.Recorder = Recorder;
}());