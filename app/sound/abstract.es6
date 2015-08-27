let errorLog = (method) => {
    console.error(`".${method}()" method must be implemented!`);
};

let $_context = Symbol();

class SoundAbstract {
    constructor (context) {
        this.nodes = [];
        this[$_context] = context;
    };

    play (offset) { errorLog('play'); };

    pause () { errorLog('pause'); };

    stop () { errorLog('stop'); };

    attachNodes (nodes = []) {
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (i === nodes.length - 1) {
                nodes[i].connect(this[$_context].destination);
            } else {
                nodes[i].connect(nodes[i + 1]);
            }
        }
    }

    destroy () {
        this.nodes = [];
        this[$_context] = null;
    }
}

export default SoundAbstract;
