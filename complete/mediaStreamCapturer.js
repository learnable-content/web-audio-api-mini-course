(function () {
    'use strict';

    class MediaStreamCapturer {
        constructor(context, ...sources) {
            const mediaStreams = sources.map(source => source.stream);

            this.mediaRecorders = mediaStreams.map(
                stream => new MediaRecorder(stream, { type: 'audio/webm' })
            );

            this.context = context;
            this.hasStopped = false;
        }

        start() {
            const results = [];
            this.hasStopped = false;

            return new Promise(resolve => {
                const data = [];
                results.push(data);

                for (let recorder of this.mediaRecorders) {
                    recorder.ondataavailable = e => {
                        data.push(e.data);

                        if (this.hasStopped) onRecordingEnd(results, resolve);
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
                .then(
                    buffers => buffers.map(
                        buffer => this.context.decodeAudioData(buffer)
                    )
                )
                .then(resolve);
        }

        convertToArrayBuffer(result) {
            const url = URL.createObjectURL(new Blob(result));

            return window.fetch(url).then(response => response.arrayBuffer());
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