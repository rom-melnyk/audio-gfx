import { ErrorCodes } from './error-constants';


function initAudioContext(): Promise<AudioContext> {
  return new Promise((resolve, reject) => {
    const AudioContext = ( <any>window ).AudioContext || ( <any>window ).webkitAudioContext;
    try {
      resolve(new AudioContext());
    } catch (e) {
      reject({ code: ErrorCodes.NOT_SUPPORTED, debug: e });
    }
  });
}


export { initAudioContext };
