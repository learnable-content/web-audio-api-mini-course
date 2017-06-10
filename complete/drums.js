(function () {
    'use strict';

    const BASE_LOOPS_URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/files/web-audio-series/{key}.mp3';

    const loopKeys = [
        { key: 'bossa-nova', name: 'Bossa Nova' },
        { key: 'electro', name: 'Electro' },
        { key: 'funky', name: 'Funky' },
        { key: 'speedy', name: 'Speedy' }
    ];

    class Drums {
        constructor(context, targetElement, itemTemplate) {
            this.context = context;
            this.targetElement = targetElement;
            this.itemTemplate = itemTemplate;

            this.fetchLoops()
                .then(loops => this.decodeLoops(loops))
                .then(loops => this.bindLoops(loops))
                .then(() => this.render());
        }

        fetchLoops() {
            const fetchPromises = loopKeys.map(
                ({ key }) => fetch(BASE_LOOPS_URL.replace('{key}', key))
            );

            return Promise.all(fetchPromises);
        }

        decodeLoops(loops) {
            const arrayBufferPromises = loops.map(loop => loop.arrayBuffer());

            return Promise.all(arrayBufferPromises)
                .then(loopBuffers => Promise.all(
                    loopBuffers.map(
                        loopBuffer => this.context.decodeAudioData(loopBuffer)
                    )
                ));
        }

        bindLoops(loops) {
            this.loops = loops.map((loop, i) => Object.assign({}, loopKeys[i], {
                loop
            }));
        }

        render() {
            console.log(this.loops);
        }
    }

    window.APP.Drums = Drums;
}());