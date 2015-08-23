/**
 * @callback onLoadCallback
 * @param {ArrayBuffer} buffer
 */

/**
 * @param {AudioContext} context
 * @param {String} url
 * @param {onLoadCallback} onLoad             gets buffer
 */
function loadSound (context, url, onLoad) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function () {
        context.decodeAudioData(request.response, onLoad, function (error) {
            console.error('WebAudio decoding error', error);
        });
    };
    request.send();
}

export default loadSound;
