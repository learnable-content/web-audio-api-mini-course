(function () {
    'use strict';

    class RecordableSource{
        constructor(context) {
            this.destination = context.createMediaStreamDestination();
        }

        enableRecording(node) {
            node.connect(this.destination);
        }

        get stream() {
            return this.destination.stream;
        }
    }

    window.APP.RecordableSource = RecordableSource;
}());