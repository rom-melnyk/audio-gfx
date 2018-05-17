function loadAudioAsBuffer(context: AudioContext, url: string): Promise<AudioBuffer> {
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


function loadAudioAsElement(url: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
      const audioEl = document.createElement('audio');
      audioEl.oncanplay = () => {
        resolve(audioEl);
      };
      audioEl.onerror = (err) => {
        console.error('Error loading the <audio> element', err);
        reject(err);
      };
      audioEl.src = url;
    }
  )
}


export { loadAudioAsBuffer, loadAudioAsElement };
