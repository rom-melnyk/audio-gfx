import initAudioContext from './init-audio-context.es6';
import loadSound from './load-sound.es6';
import KeyHandler from './key-handler.es6';
import Sound from './sound-control.es6';

let url = './audio/nagano_-_zastrahuy_bratuhu.mp3';
let context, buffer, source, sound;

let soundStat = {
    duration: null,
    length: null,
    numberOfChannels: null,
    sampleRate: null
};

function onLoad () {
    context = initAudioContext();
    if (!context) { return; }

    KeyHandler.init();

    loadSound(context, url, (arrayBuffer) => {
        console.log('Ready to go!\nPress [SPACE] to start playing.');
        buffer = arrayBuffer;
        ['duration', 'length', 'numberOfChannels', 'sampleRate'].forEach((key) => {
            soundStat[key] = arrayBuffer[key];
        });
        sound = new Sound(context, arrayBuffer);
        KeyHandler.handle(KeyHandler.KEY_SPACE, playPause);
    });

}

function playPause () {
    if (sound.isPaused) {
        sound.play();
    } else {
        sound.pause();
    }
}

window.addEventListener('load', onLoad, true);
