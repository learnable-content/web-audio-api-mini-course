(function () {
    'use strict';

    class MediaStreamCapturer {
        constructor(...sources) {
            const mediaStream = new MediaStream(
                sources.map(source => source.track)
            );

            console.log(mediaStream);

            this.mediaRecorder = new MediaRecorder(mediaStream);
            this.hasStopped = false;
        }

        start() {
            this.hasStopped = false;

            return new Promise(resolve => {
                const data = [];

                this.mediaRecorder.ondataavailable = e => {
                    data.push(e.data);

                    if (this.hasStopped) resolve(new Blob(data));
                }

                this.mediaRecorder.start();
            });
        }

        convertToArrayBuffer(result) {
            const url = URL.createObjectURL(new Blob(result));

            return window.fetch(url).then(response => response.arrayBuffer());
        }

        stop() {
            this.mediaRecorder.stop();
            this.hasStopped = true;
        }
    }

    window.APP.MediaStreamCapturer = MediaStreamCapturer;
}());