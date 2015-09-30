/**
 * @param {AudioContext} context
 * @param {String} url
 * @return {Promise}                `.resolve` receives AudioBuffer as parameter
 */
function loadSound (context, url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = () => {
            context.decodeAudioData(
                request.response,
                resolve,
                (error) => {
                    console.error('WebAudio decoding error', error);
                    reject(error);
                }
            );
        };
        request.send();
    });
}

export default loadSound;
