(function () {
    'use strict';

    class MediaStreamCapturer {
        constructor(...sources) {
            const mediaStreams = sources.map(source => new MediaStream(source.stream));

            this.mediaRecorders = mediaStreams.map(
                stream => new MediaRecorder(stream, { type: 'audio/webm' })
            );
        }

        start() {
            return new Promise(resolve => {
                const data = [];

                for (let recorder of this.mediaRecorders) {
                    recorder.ondataavailable = e => console.log(e) || data.push(e.data);
                    recorder.onstop = () => resolve(new Blob(data));
                    recorder.start();
                }
            });
        }

        stop() {
            for (let recorder of this.mediaRecorders) {
                recorder.stop();
            }
        }
    }

    window.APP.MediaStreamCapturer = MediaStreamCapturer;
}());