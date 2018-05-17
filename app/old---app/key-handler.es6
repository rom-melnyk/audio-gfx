let listeners = {};

function handle (e) {
    //console.log('\t// keyCode = ', e.keyCode);
    for (let key in listeners) {
        // must be == not === because `key` is String and `e.keyCode` is Number
        if (e.keyCode == key && listeners[key] instanceof Array) {
            listeners[key].forEach((handler) => {
                if (typeof handler === 'function') {
                    handler(e);
                }
            });
        }
    }
}

let KeyHandler = {
    init () {
        window.addEventListener('keydown', handle, true);
    },
    /**
     * @param {Number} key
     * @param {Function} handler
     */
    handle (key, handler) {
        if (!listeners[key]) { listeners[key] = []; }
        if (listeners[key].indexOf(handler) === -1) { listeners[key].push(handler); }
    },
    unload () {
        window.removeEventListener('keydown', handle);
        listeners = {};
    }
};

KeyHandler.KEY_SPACE = 32;

export default KeyHandler;
