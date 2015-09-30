/**
 * @callback onCanPlayCallback
 * @param {HTMLElement} element
 */

/**
 * @param {String} url
 * @param {onCanPlayCallback} onCanPlay         gets HTMLElement
 */
function createSoundElement (url) {
    return new Promise((resolve, reject) => {
        const audio = document.createElement('audio');
        audio.oncanplay = () => {
            resolve(audio);
        };
        audio.onerror = (err) => {
            console.error('Error loading the <audio> element', err);
            reject(err);
        };
        audio.src = url;
    }
)}

export default createSoundElement;
