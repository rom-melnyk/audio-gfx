import './style.css';

import initAudioContext from './init-audio-context.es6';
import loadSound from './load-sound.es6';
import KeyHandler from './key-handler.es6';
import Sound from './sound/sound.es6';
import Stat from './sound/stat.es6';

let url = './audio/nagano_-_zastrahuy_bratuhu.mp3';
let context, sound, stat;

let analyser, levels = [];

function onLoad () {
    context = initAudioContext();
    if (!context) { return; }

    KeyHandler.init();

    loadSound(context, url, (audioBuffer) => {
        console.log('Ready to go!\nPress [SPACE] to start playing.');
        stat = new Stat(audioBuffer);
        analyser = context.createAnalyser();
        analyser.fftSize = 64;
        createHtml();
        sound = new Sound(context, audioBuffer, [analyser]);
        KeyHandler.handle(KeyHandler.KEY_SPACE, playPause);
    });

}

function playPause () {
    if (sound.isPaused) {
        sound.play();
        setTimeout(() => {
            let arr = new Uint8Array(analyser.fftSize);
            analyser.getByteFrequencyData(arr);
            //console.log(' non-zeroes: ', Array.prototype.filter.call(arr, (el) => { return el > 0; }).length);
        }, 10);
    } else {
        sound.pause();
    }
}

function createHtml () {
    for (let i = 0; i < analyser.fftSize; i++) {
        let div = document.createElement('div');
        div.style.width = 100 / analyser.fftSize + '%';
        //div.style.height = Math.floor(Math.random() * 100) + 'px';
        div.style.left = i * 100 / analyser.fftSize + '%';
        div.className = 'analyser';
        document.body.appendChild(div);
        levels.push(div);
    }
}

function tick () {

}

window.addEventListener('load', onLoad, true);
