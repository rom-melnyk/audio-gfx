import assign from 'object-assign';

let Container = {
    dom: null,

    create (props) {
        if (Container.dom) { return; }
        Container.dom = document.createElement('div');
        assign(Container.dom, props);
        return Container.dom;
    },

    destroy () {
        Container.dom.parent && Container.dom.parent.removeChild(Container.dom);
        Container.dom = null;
    }
};

export default Container;
