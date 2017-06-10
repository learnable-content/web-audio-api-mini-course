(function () {
    'use strict';

    class RecordableSource{
        connect(targetNode) {
            if (this.sourceNode) {
                this.sourceNode.connect(targetNode);
            }
        }
    }

    window.APP.RecordableSource = RecordableSource;
}());