(function () {
    'use strict';

    class MediaStreamCapturer {
        constructor(...sources) {
            const mediaStreams = sources.map(source => new MediaStream(source.stream));

            this.mediaRecorders = mediaStreams.map(
                stream => new MediaRecorder(stream, { type: 'audio/webm' })
            );

            this.hasStopped = false;
        }

        start() {
            this.hasStopped = false;

            return new Promise(resolve => {
                const data = [];

                for (let recorder of this.mediaRecorders) {
                    recorder.ondataavailable = e => {
                        data.push(e.data);

                        if (this.hasStopped) resolve(new Blob(data));
                    }

                    recorder.start();
                }
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