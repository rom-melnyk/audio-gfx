var Color = require('color-js');

/**
 * @param {Number} size                         Number of bars to show
 * @param {String} [className="analyser"]       Class attribute value for each bar
 * @constructor
 */
function Spectrogram (size, className = 'spectrogram-bar') {
    let _barPairs = [],
        _container = null,
        //_containerHeight = null,
        fadeoutTimerId = null;

    function getStartColor (barNo) {
        return new Color.hsla(Math.floor(barNo * 360 / size), 30, 30, 1);
    }

    function getEndColor (color) {
        return color.clone().tune({l: -5});
    }

    function getBackgroundImageString (barElement) {
        const s1 = barElement._color.toString();
        const s2 = getEndColor(barElement._color).toString();

        return `-webkit-linear-gradient(top, ${s1} 0%, ${s2} 35%, ${s2} 65%, ${s1} 100%)`;
    }

    function _init () {
        const gapFactor = .4;
        for (let i = 0; i < size; i++) {
            let bar = document.createElement('div');
            let color = getStartColor(i);

            const width = 100 / size / 2;
            bar.style.width = width * (1 - gapFactor) + '%';
            bar.style.left = (50 + i * width) + '%';
            bar.className = className;
            bar._color = color;
            bar.style.backgroundImage = getBackgroundImageString(bar);

            _barPairs.push(bar);

            bar = bar.cloneNode(false);
            bar.style.right = (50 + i * width + gapFactor * width) + '%';
            bar.style.left = 'auto';
            bar._color = color.clone();

            _barPairs.push(bar);
        }
    }

    /**
     * @method update
     * @param {Number[]} levels
     */
    this.update = (levels = []) => {
        _barPairs.forEach((bar, index) => {
            // adapting index: pairs of bars are mapped to single levels[index] value
            if (index % 2 === 1) {
                index = index - 1;
            }
            index = index / 2;

            const level = Math.floor((levels[index] || 0) / 255 * 100);

            bar._color.set({s: level, l: 10 + level * .7});

            const height = Math.floor(level * .5);
            bar.style.height = height + '%';
            bar.style.top = (100 - height) / 2 + '%';

            bar.style.backgroundImage = getBackgroundImageString(bar);

            bar._level = levels[index];
        });

        return this;
    };

    this.forEach = (callback) => {
        _barPairs.forEach.call(_barPairs, callback);
        return this;
    };

    /**
     * @method renderTo
     * @param {HTMLElement} container
     */
    this.renderTo = (container) => {
        _container = container;
        //_containerHeight = _container.clientHeight;
        _barPairs.forEach((bar) => { container.appendChild(bar); });
        return this;
    };

    this.fadeOut = (ticksPerSecond = 16, factor = .8) => {
        let levels = [],
            self = this,
            _interval = 1000 / ticksPerSecond;

        _barPairs.forEach((div) => {
            levels.push(div._level);
        });

        function _doFade () {
            let needUpdates = false;
            levels = levels.map((l) => {
                if (l > 0) {
                    l = Math.floor(l * factor);
                    needUpdates = true;
                }
                return l;
            });

            self.update(levels);

            if (needUpdates) {
                fadeoutTimerId = setTimeout(_doFade, _interval);
            } else {
                fadeoutTimerId = null;
            }
        }

        _doFade();
    };

    this.cancelFadeOut = () => {
        if (fadeoutTimerId) {
            clearTimeout(fadeoutTimerId);
            fadeoutTimerId = null;
        }
    };

    this.destroy = () => {
        if (_container) {
            _barPairs.forEach((div) => {
                _container.removeChild(div);
            });
            _barPairs = [];
            _container = null;
            //_containerHeight = null;
        }
    };

    _init();
}

export default Spectrogram;
