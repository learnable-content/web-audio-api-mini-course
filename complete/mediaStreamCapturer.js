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
                return new Blob(data, { type: 'audio/ogg; codecs=opus' });
            };
        }
    }

    window.APP.MediaStreamCapturer = MediaStreamCapturer;
}());