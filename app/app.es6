import initAudioContext from './init-audio-context.es6';
import loadSound from './load-sound.es6';
import KeyHandler from './key-handler.es6';

let url = './audio/nagano_-_zastrahuy_bratuhu.mp3';
let context, buffer, source;
let isPaused = true,
    startedAt = null,
    pausedAt = null,
    offset = 0;

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
        KeyHandler.handle(KeyHandler.KEY_SPACE, playPause);
    });

}

function playPause () {
    isPaused = !isPaused;
    if (isPaused) {
        pauseSound();
    } else {
        playSound();
    }
}

function playSound () {
    if (offset >= soundStat.duration) {
        stopSound();
        playSound();
        return;
    }

    // stop and disconnect the old source;
    if (source) {
        source.stop();
        source.disconnect();
    }

    source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);

    startedAt = Date.now();
    source.start(0, offset);
}

function pauseSound () {
    pausedAt = Date.now();
    source.stop();
    offset += (pausedAt - startedAt) / 1000 || 0;
}

function stopSound () {
    if (source) {
        source.stop();
        source.disconnect();
    }

    offset = 0;
    isPaused = true;
}

window.addEventListener('load', onLoad, true);
