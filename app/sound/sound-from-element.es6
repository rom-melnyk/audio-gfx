import SoundAbstract from './abstract.es6';

function createSource () {
    let source = this.context.createMediaElementSource(this.element);
    source.connect(this.nodes[0] || this.context.destination);
    return source;
}

function invalidateSource () {
    if (this.source) {
        this.element.pause();
        this.source.disconnect();
        this.source = null;
    }
}



class SoundFromElement extends SoundAbstract {
    constructor (context, element) {
        super(context);

        // private stuff
        this.element = element;

        this.isPaused = true;
        this.source = createSource.call(this);
    };

    /**
     * @param {Number} [offset]
     * @return {SoundFromElement}
     */
    play (offset = this.source.currentTime) {
        this.isPaused = false;
        this.element.play();

        /*if (offset >= this.element.duration) {
            this.stop();
            this.play();
            return this;
        }*/

        return this;
    };

    pause () {
        if (!this.isPaused) {
            this.isPaused = true;
            this.element.pause();
        }
        return this;
    };

    stop () {
        invalidateSource.call(this);
        this.isPaused = true;
        return this;
    };
}

export default SoundFromElement;
