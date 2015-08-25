/**
 * @param {AudioContext} context
 * @param {AudioBuffer} buffer
 * @param {Object[]} [nodes=[]]
 * @return {AudioBufferSourceNode}
 */
function createSource (context, buffer, nodes = []) {
    let source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(nodes[0] || context.destination);
    return source;
}

/**
 * Stop and disconnect old source
 * @param {AudioBufferSourceNode} [source]
 */
function invalidateSource (source) {
    if (source) {
        source.stop();
        source.disconnect();
        source = null;
    }
}

// ------------------------------------------
// context.createMediaElementSource(audioTag);
//
// ------------------------------------------

/**
 * @param {AudioContext} context
 * @param {AudioBuffer} buffer
 * @param {Object[]} [nodes=[]]
 * @returns {*}
 * @constructor
 */
function Sound (context, buffer, nodes = []) {
    let _startedAt = null,
        _pausedAt = null,
        _offset = 0;

    this.isPaused = true;
    this.nodes = nodes;
    for (let i = nodes.length - 1; i >= 0; i--) {
        if (i === nodes.length - 1) {
            nodes[i].connect(context.destination);
        } else {
            nodes[i].connect(nodes[i + 1]);
        }
    }
    this.source = createSource(context, buffer, this.nodes);

    /**
     * @param {Number} [offset]
     * @return {Sound}
     */
    this.play = (offset = _offset) => {
        if (_offset >= buffer.duration) {
            this.stop();
            this.play();
            return this;
        }

        if (_startedAt) {
            invalidateSource(this.source);
        }
        this.source = createSource(context, buffer, this.nodes);

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
        invalidateSource(this.source);
        _startedAt = null;
        _pausedAt = null;
        _offset = 0;
        this.isPaused = true;
    };
}

export default Sound;
