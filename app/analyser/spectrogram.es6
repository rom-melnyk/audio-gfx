var Color = require('color-js');

/**
 * @param {Number} size                         Number of bars to show
 * @param {String} [className="analyser"]       Class attribute value for each bar
 * @constructor
 */
function Spectrogram (size, className = 'analyser') {
    let _bars = [],
        _container = null,
        _containerHeight = null,
        fadeoutTimerId = null;

    function getStartColor (barNo) {
        return new Color.hsl(Math.floor(barNo * 360 / size), 30, 60);
    }

    function getEndColor (barNo) {
        return getStartColor(barNo).set({s: 0, l: 100});
    }

    function getBackgroundImage (c1, c2) {
        const s1 = c1.toString(),
            s2 = c2.toString();
        return `-webkit-linear-gradient(top, ${s1} 0%, ${s2} 40%, ${s2} 60%, ${s1} 100%)`;
    }

    function _init () {
        for (let i = 0; i < size; i++) {
            let bar = document.createElement('div'),
                c1 = getStartColor(i).toString(),
                c2 = getEndColor(i).toString();

            bar.style.width = 100 / size + '%';
            bar.style.left = i * 100 / size + '%';
            bar.className = className;
            bar.style.backgroundImage = getBackgroundImage(c1, c2);
            _bars.push(bar);
        }
    }

    /**
     * @method update
     * @param {Number[]} levels
     */
    this.update = (levels = []) => {
        _bars.forEach((div, index) => {
            const level = Math.floor(levels[index] || 0),
                c1 = getStartColor(index).tune.s(level / 255 * 100),
                c2 = getEndColor(index);

            div.style.height = level + 'px';
            div.style.top = (_containerHeight - level) / 2 + 'px';
            div.style.backgroundImage = getBackgroundImage(c1, c2);
            div._level = level;
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
        _container = container;
        _containerHeight = _container.clientHeight;
        _bars.forEach((bar) => { container.appendChild(bar); });
        return this;
    };

    this.fadeOut = (ticksPerSecond = 16, factor = .8) => {
        let levels = [],
            self = this,
            _interval = 1000 / ticksPerSecond;

        _bars.forEach((div) => {
            levels.push(div._level);
        });

        let fn = () => {
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
                fadeoutTimerId = setTimeout(fn, _interval);
            } else {
                fadeoutTimerId = null;
            }
        };

        fn();
    };

    this.cancelFadeOut = () => {
        if (fadeoutTimerId) {
            clearTimeout(fadeoutTimerId);
            fadeoutTimerId = null;
        }
    };

    this.destroy = () => {
        if (_container) {
            _bars.forEach((div) => {
                _container.removeChild(div);
            });
            _bars = [];
            _container = null;
            _containerHeight = null;
        }
    };

    _init();
}

export default Spectrogram;
