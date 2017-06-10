(function () {
    'use strict';

    const RECORDING_DURATION_SECONDS = 10;

    class Recorder {
        constructor(targetElement, ...sources) {
            this.targetElement = targetElement;
            this.progressBar = targetElement.querySelector('.recorder__progress-bar');
            this.sources = sources;

            this.animateProgressBar();
        }

        animateProgressBar() {
            this.progressBar.animate(
                [{ width: 0 }, { width: '100%' }],
                RECORDING_DURATION_SECONDS * 1000
            );
        }
    }

    window.APP.Recorder = Recorder;
}());