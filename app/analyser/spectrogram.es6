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

    function _init () {
        for (let i = 0; i < size; i++) {
            let bar = document.createElement('div'),
                c1 = new Color.hsl(Math.floor(i * 360 / size), 50, 50),
                c2 = c1.clone().tune.l(10);

            c1 = c1.toString();
            c2 = c2.toString();

            bar.style.width = 100 / size + '%';
            bar.style.left = i * 100 / size + '%';
            bar.className = className;
            bar.style.backgroundImage = `-webkit-linear-gradient(top, ${c1} 0%, ${c2} 40%, ${c2} 60%, ${c1} 100%)`;
            _bars.push(bar);
        }
    }

    /**
     * @method update
     * @param {Number[]} levels
     */
    this.update = (levels = []) => {
        _bars.forEach((div, index) => {
            var level = Math.floor(levels[index] || 0);
            div.style.height = level + 'px';
            div.style.top = (_containerHeight - level) / 2 + 'px';
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
