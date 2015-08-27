let errorLog = (method) => {
    console.error(`".${method}()" method must be implemented!`);
};

class SoundAbstract {
    constructor (context) {
        this.context = context;
        this.nodes = [];
        this.source = null;
    };

    play (offset) { errorLog('play'); };

    pause () { errorLog('pause'); };

    stop () { errorLog('stop'); };

    attachNodes (nodes = this.nodes) {
        this.nodes = nodes;
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            if (i === this.nodes.length - 1) {
                this.nodes[i].connect(this.context.destination);
            } else {
                this.nodes[i].connect(this.nodes[i + 1]);
            }
        }
        if (this.source) {
            this.source.connect(this.nodes[0] || this.context.destination);
        }
        return this;
    };

    destroy () {
        this.context = null;
        this.nodes = [];
        this.source = null;

    };
}

export default SoundAbstract;
