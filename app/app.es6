import initAudioContext from './init-audio-context.es6';
import loadSound from './load-sound.es6';
import KeyHandler from './key-handler.es6';
import Sound from './sound/sound.es6';
import Stat from './sound/stat.es6';

let url = './audio/nagano_-_zastrahuy_bratuhu.mp3';
let context, sound, stat;

function onLoad () {
    context = initAudioContext();
    if (!context) { return; }

    KeyHandler.init();

    loadSound(context, url, (audioBuffer) => {
        console.log('Ready to go!\nPress [SPACE] to start playing.');
        stat = new Stat(audioBuffer);
        sound = new Sound(context, audioBuffer);
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
