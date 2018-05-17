import '../style.css';

import initAudioContext from './init-audio-context.ts';
import loadSoundFromBuffer from './loaders/load-sound-from-buffer.ts';
import loadSoundFromElement from './loaders/load-sound-from-element.ts';

import Config from './config.hson';

import KeyHandler from './key-handler.es6';
import SoundFromBuffer from './sound/sound-from-buffer.es6';
import SoundFromElement from './sound/sound-from-element.es6';
import Stat from './sound/stat.es6';
import Analyser from './analyser/analyzer.es6';
import Spectrogram from './analyser/spectrogram.es6';

let context, sound, stat, analyser, spectrogram;

const URL = Config.urls[0];
const ANALYSER_BARS_COUNT = Config.analyser.barCount;
const ANALYSER_TICKS_PER_SECOND = Config.analyser.ticksPerSecond;

function onLoad () {
    context = initAudioContext();
    if (!context) { return; }

    KeyHandler.init();

    if (Config.source === 'buffer') {
        loadSoundFromBuffer(context, URL).then(onBufferLoaded);
    } else {
        loadSoundFromElement(URL).then(onBufferLoaded);
    }
}

function onBufferLoaded (source) {
    console.log('Ready to go! Press [SPACE] to start playing.');
    //stat = new Stat(audioBuffer);
    analyser = new Analyser(context, ANALYSER_BARS_COUNT * 2)
        .update({smoothingTimeConstant: .6});

    sound = Config.source === 'buffer'
        ? new SoundFromBuffer(context, source)
        : new SoundFromElement(context, source);
    sound.attachNodes([analyser.node]);

    spectrogram = new Spectrogram(ANALYSER_BARS_COUNT);
    spectrogram.renderTo(
        _createSpectrogramWrapper()
    );

    KeyHandler.handle(KeyHandler.KEY_SPACE, playPause);
}

function playPause () {
    if (sound.isPaused) {
        spectrogram.cancelFadeOut();
        sound.play();
        analyser.startCapturing((levels) => { spectrogram.update(levels); }, ANALYSER_TICKS_PER_SECOND);
    } else {
        sound.pause();
        analyser.stopCapturing(() => { /*spectrogram.fadeOut(ANALYSER_TICKS_PER_SECOND, .5);*/ });
    }
}

function _createSpectrogramWrapper () {
    const div = document.createElement('div');
    div.className = 'spectrogram';
    document.body.appendChild(div);
    return div;
}

window.addEventListener('load', onLoad, true);