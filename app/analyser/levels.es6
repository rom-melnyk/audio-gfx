let container, divs = [];

let Levels = {
    init (size) {
        container = document.body;

        for (let i = 0; i < size; i++) {
            let div = document.createElement('div');
            div.style.width = 100 / size + '%';
            div.style.left = i * 100 / size + '%';
            div.className = 'analyser';
            divs.push(div);
            container.appendChild(div);
        }
    },

    update (levels = []) {
        divs.forEach((div, index) => {
            div.style.height = Math.floor((levels[index] || 0)) + 'px';
        });
    },

    forEach (callback) {
        divs.forEach.call(divs, callback);
    },

    destroy () {
        divs.forEach((div) => {
            container.removeChild(div);
        });
        divs = [];
    }
};

export default Levels
