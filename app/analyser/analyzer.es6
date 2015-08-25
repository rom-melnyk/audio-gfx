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

    /**
     * @param {Number} fft                  Fourier row size. MUST be power of 2 in the range [32..2048]
     */
    this.setFft = (fft) => {
        _fft = fft;
        this.analyser.fftSize = _fft;
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

    this.setFft(fft);
}

export default Analyser;
