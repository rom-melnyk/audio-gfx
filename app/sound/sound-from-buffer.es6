import SoundAbstract from './abstract.es6';

let $_startedAt = Symbol(),
    $_pausedAt = Symbol(),
    $_offset = Symbol();

function createSource () {
    let source = this.context.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this.nodes[0] || this.context.destination);
    return source;
}

function invalidateSource () {
    if (this.source) {
        this.source.stop();
        this.source.disconnect();
        this.source = null;
    }
}



class SoundFromBuffer extends SoundAbstract {
    constructor (context, buffer) {
        super(context);

        // private stuff
        this.buffer = buffer;
        this[$_startedAt] = null;
        this[$_pausedAt] = null;
        this[$_offset] = 0;

        this.isPaused = true;
        this.source = createSource.call(this);
    };

    /**
     * @param {Number} [offset]
     * @return {SoundFromElement}
     */
    play (offset = this[$_offset]) {
        if (offset >= this.buffer.duration) {
            this.stop();
            this.play();
            return this;
        }

        if (this[$_startedAt]) {
            invalidateSource.call(this);
            this.source = null;
        }
        this.source = createSource.call(this);

        this[$_offset] = offset;
        this[$_startedAt] = Date.now();
        this.isPaused = false;
        this.source.start(0, this[$_offset]);
        return this;
    };

    pause () {
        if (!this.isPaused) {
            this[$_pausedAt] = Date.now();
            this[$_offset] += (this[$_pausedAt] - this[$_startedAt]) / 1000 || 0;
            this.isPaused = true;
            this.source.stop();
        }
        return this;
    };

    stop () {
        invalidateSource.call(this);
        this[$_startedAt] = null;
        this[$_pausedAt] = null;
        this[$_offset] = 0;
        this.isPaused = true;
        return this;
    };
}

export default SoundFromBuffer;
