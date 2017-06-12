(function () {
    'use strict';

    const MIME_TYPE = 'audio/webm; codecs=opus';

    class MediaStreamCapturer {
        constructor(context, ...sources) {
            const mediaStreams = sources.map(source => source.stream);

            this.mediaRecorders = mediaStreams.map(
                stream => new MediaRecorder(stream, { type: MIME_TYPE })
            );

            this.context = context;
            this.hasStopped = false;
        }

        start() {
            const results = [];
            this.hasStopped = false;

            return new Promise(resolve => {
                for (let recorder of this.mediaRecorders) {
                    const data = [];
                    results.push(data);

                    recorder.ondataavailable = e => {
                        data.push(e.data);

                        if (this.hasStopped) {
                            this.onRecordingEnd(results, resolve);
                        }
                    }

                    recorder.start();
                }
            });
        }

        onRecordingEnd(results, resolve) {
            const arrayBufferPromises = Promise.all(
                results.map(this.convertToArrayBuffer)
            );

            return arrayBufferPromises
                .then(buffers => Promise.all(buffers.map(
                    buffer => this.context.decodeAudioData(buffer)
                )))
                .then(resolve);
        }

        convertToArrayBuffer(result) {
            return new Promise(resolve => {
                const blob = new Blob(result, { type: MIME_TYPE });
                const fileReader = new FileReader();

                fileReader.onload = e => resolve(e.target.result);
                fileReader.readAsArrayBuffer(blob);
            });
        }

        stop() {
            for (let recorder of this.mediaRecorders) {
                recorder.stop();
            }

            this.hasStopped = true;
        }
    }

    window.APP.MediaStreamCapturer = MediaStreamCapturer;
}());
