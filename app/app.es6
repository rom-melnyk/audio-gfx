import './style.css';

import initAudioContext from './init-audio-context.es6';
import loadSound from './load-sound.es6';
import KeyHandler from './key-handler.es6';
import Sound from './sound/sound.es6';
import Stat from './sound/stat.es6';
import Analyser from './analyser/analyzer.es6';
import Spectrogram from './analyser/spectrogram.es6';

let context, sound, stat, analyser, spectrogram;

const URL = [
        './audio/nagano_-_zastrahuy_bratuhu.mp3',
        './audio/immunize ft. liam howlett .mp3'
    ];
const ANALYSER_BARS_COUNT = 32;
const ANALYSER_TICKS_PER_SECOND = 16;

function onLoad () {
    context = initAudioContext();
    if (!context) { return; }

    KeyHandler.init();

    loadSound(context, URL[1], (audioBuffer) => {
        console.log('Ready to go!\nPress [SPACE] to start playing.');
        stat = new Stat(audioBuffer);
        analyser = new Analyser(context, ANALYSER_BARS_COUNT * 2);
        sound = new Sound(context, audioBuffer, [analyser.node]);
        spectrogram = new Spectrogram(analyser.getFft() / 2);
        spectrogram.renderTo(document.body);
        KeyHandler.handle(KeyHandler.KEY_SPACE, playPause);
    });

}

function playPause () {
    if (sound.isPaused) {
        sound.play();
        analyser.startCapturing((levels) => { spectrogram.update(levels); }, ANALYSER_TICKS_PER_SECOND);
    } else {
        sound.pause();
        analyser.stopCapturing(() => {
            spectrogram.forEach((div) => { div.style.height = 0; });
        });
    }
}

window.addEventListener('load', onLoad, true);
