(function () {
    'use strict';

    const BASE_LOOPS_URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/files/web-audio-series/{key}.mp3';

    const { RecordableSource } = window.APP;

    const loopKeys = [
        { key: 'bossa-nova', name: 'Bossa Nova' },
        { key: 'electro', name: 'Electro' },
        { key: 'funky', name: 'Funky' },
        { key: 'speedy', name: 'Speedy' }
    ];

    class Drums extends RecordableSource {
        constructor(context, targetElement, itemTemplate) {
            super();

            this.context = context;
            this.targetElement = targetElement;
            this.itemsContainer = targetElement.querySelector('.drums__samples');
            this.itemTemplate = itemTemplate.content.firstElementChild;
            this.sourceNode = null;

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
            this.loops = loops.map((loop, i) => Object.assign(
                {},
                loopKeys[i], { loop }
            ));
        }

        render() {
            for (let { key, name, loop } of this.loops) {
                const item = this.itemTemplate.cloneNode(true);

                item.textContent = name;
                item.onclick = () => this.play(loop);

                this.itemsContainer.appendChild(item);
            }
        }

        play(loop) {
            if (this.sourceNode) this.sourceNode.stop();

            const sourceNode = this.context.createBufferSource();
            sourceNode.buffer = loop;
            sourceNode.loop = true;

            sourceNode.connect(this.context.destination);
            sourceNode.start();

            this.sourceNode = sourceNode;
        }
    }

    window.APP.Drums = Drums;
}());