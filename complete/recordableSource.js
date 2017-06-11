(function () {
    'use strict';

    class RecordableSource{
        constructor(context) {
            this.destination = context.createMediaStreamDestination();
        }

        enableRecording(node) {
            node.connect(this.destination);
        }

        get track() {
            return this.destination.stream.getAudioTracks()[0];
        }
    }

    window.APP.RecordableSource = RecordableSource;
}());