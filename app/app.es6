import initAudioContext from './init.es6';

function onLoad () {
    var context = initAudioContext();
    if (!context) { return; }

    console.log(context);

}

window.addEventListener('load', onLoad, true);
