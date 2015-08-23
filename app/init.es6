/**
 * @return {Object|null}
 */
function initAudioContext () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    try {
        let context = new AudioContext();
        return context;
    } catch (e) {
        console.log('Your browser does not support WebAudio API.');
        return null;
    }
}

export default initAudioContext;
