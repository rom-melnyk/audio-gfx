let errorLog = (method) => {
    console.error(`".${method}()" method must be implemented!`);
};

class SoundAbstract {
    constructor (context) {
        this.nodes = [];
    };

    play (offset) { errorLog('play'); };

    pause () { errorLog('pause'); };

    stop () { errorLog('stop'); };

    attachNodes (nodes = []) {
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (i === nodes.length - 1) {
                nodes[i].connect(context.destination);
            } else {
                nodes[i].connect(nodes[i + 1]);
            }
        }
    }
}