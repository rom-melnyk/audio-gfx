/**
 * Stop and disconnect old source
 * @param {AudioBufferSourceNode} [source]
 */
function invalidateSource (source) {
    if (source) {
        source.stop();
        source.disconnect();
    }
}

/**
 * @return {AudioBufferSourceNode}
 */
function createSource (context, buffer) {
    let source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    return source
}

/**
 * @param {AudioContext} context
 * @param {AudioBuffer} buffer
 * @returns {*}
 * @constructor
 */
function Sound (context, buffer) {
    let _startedAt = null,
        _pausedAt = null,
        _offset = 0;

    this.duration = buffer.duration;
    this.isPaused = true;
    this.source = createSource(context, buffer);

    /**
     * @param {Number} [offset]
     * @return {Sound}
     */
    this.play = (offset = _offset) => {
        if (_offset >= duration) {
            this.stop();
            this.play();
            return this;
        }

        if (_startedAt) {
            invalidateSource(this.source);
        }
        this.source = createSource(context, buffer);

        _offset = offset;
        _startedAt = Date.now();
        this.isPaused = false;
        this.source.start(0, _offset);
        return this;
    };

    this.pause = () => {
        if (!this.isPaused) {
            _pausedAt = Date.now();
            _offset += (_pausedAt - _startedAt) / 1000 || 0;
            this.isPaused = true;
            this.source.stop();
        }
        return this;
    };

    this.stop = () => {
        invalidateSource(source);
        _offset = 0;
        this.isPaused = true;
    };
}

export default Sound;
