/**
 * @return {AudioContext|null}
 */
function initAudioContext () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    try {
        return new AudioContext();
    } catch (e) {
        console.error('Your browser does not support WebAudio API.');
        return null;
    }
}

export default initAudioContext;
