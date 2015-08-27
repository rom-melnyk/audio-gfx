/**
 * @callback onCanPlayCallback
 * @param {HTMLElement} element
 */

/**
 * @param {String} url
 * @param {onCanPlayCallback} onCanPlay         gets HTMLElement
 */
function createSoundElement (url, onCanPlay) {
    var audio = document.createElement('audio');
    audio.oncanplay = function () {
        onCanPlay(audio);
    };
    audio.src = url;
}

export default createSoundElement;
