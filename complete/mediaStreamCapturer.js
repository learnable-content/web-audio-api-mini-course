(function () {
    'use strict';

    class MediaStreamCapturer {
        constructor(mediaStream) {
            this.mediaStream = mediaStream;
        }

        start() {
            const mediaRecorder = new MediaRecorder(this.mediaStream);
            const data = [];

            mediaRecorder.ondataavailable = e => e.data.size && data.push(e.data);
            mediaRecorder.start();

            return function stop() {
                mediaRecorder.stop();
                return URL.createObjectURL(new Blob(data));
            };
        }
    }

    window.APP.MediaStreamCapturer = MediaStreamCapturer;
}());