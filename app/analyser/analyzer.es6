/**
 * @param {AudioContext} context
 * @param {Number} [fft=64]                 Fourier row size. MUST be power of 2 in the range [32..2048]
 * @constructor
 */
function Analyser (context, fft = 64) {
    let _fft,
        _timeoutId = null,
        _interval,
        _tickFn;

    /**
     * @property {AnalyzerNode} analyzer
     * @alias node
     */
    this.analyser = this.node = context.createAnalyser();
    this.analyser.minDecibels = -100;
    this.analyser.maxDecibels = -30;
    this.analyser.smoothingTimeConstant = .8;

    /**
     * @param {Object} [props]
     * @param {Number} [props.fftSize]
     * @param {Number} [props.minDecibels]
     * @param {Number} [props.maxDecibels]
     * @param {Number} [props.smoothingTimeConstant]
     */
    this.update = (props) => {
        let analyser = this.analyser;
        ['fftSize', 'minDecibels', 'maxDecibels', 'smoothingTimeConstant'].forEach((name) => {
            if (typeof props[name] === 'number') {
                analyser[name] = props[name];
                if (name === 'fftSize') { _fft = props[name]; }
            }
        });
        return this;
    };

    /**
     * @returns {Number}
     */
    this.getFft = () => { return _fft; };

    /**
     * @param {Function} callback           Receives the spectrogram array as the parameter
     * @param {Number} [ticksPerSecond=4]
     */
    this.startCapturing = (callback, ticksPerSecond = 4) => {
        _interval = 1000 / ticksPerSecond;
        if (_timeoutId !== null) {
            this.stopCapturing();
        }

        _tickFn = () => {
            let arr = new Uint8Array(_fft);
            this.analyser.getByteFrequencyData(arr);
            callback(arr);
            arr = null;
            _timeoutId = setTimeout(_tickFn, _interval);
        };

        _tickFn();
        return this;
    };

    /**
     * @param {Function} [callback]
     */
    this.stopCapturing = (callback = () => {}) => {
        clearTimeout(_timeoutId);
        _timeoutId = null;
        callback();
        return this;
    };

    this.update({fftSize: fft});
}

export default Analyser;
