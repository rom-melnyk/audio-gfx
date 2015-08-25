/**
 * @param {Number} size                         Number of bars to show
 * @param {String} [className="analyser"]       Class attribute value for each bar
 * @constructor
 */
function Spectrogram (size, className = 'analyser') {
    let _bars = [];

    function _init () {
        for (let i = 0; i < size; i++) {
            let bar = document.createElement('div');
            bar.style.width = 100 / size + '%';
            bar.style.left = i * 100 / size + '%';
            bar.className = className;
            _bars.push(bar);
        }
    }

    /**
     * @method update
     * @param {Number[]} levels
     */
    this.update = (levels = []) => {
        _bars.forEach((div, index) => {
            div.style.height = Math.floor((levels[index] || 0)) + 'px';
        });
    };

    this.forEach = (callback) => {
        _bars.forEach.call(_bars, callback);
        return this;
    };

    /**
     * @method renderTo
     * @param {HTMLElement} container
     */
    this.renderTo = (container) => {
        _bars.forEach((bar) => { container.appendChild(bar); });
        return this;
    };

    this.destroy = () => {
        _bars.forEach((div) => {
            container.removeChild(div);
        });
        _bars = [];
    };

    _init();
}

export default Spectrogram;
