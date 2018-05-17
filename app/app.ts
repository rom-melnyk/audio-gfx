import { Observable, Observer } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';

import { ErrorCodes, ErrorMessages, iError } from './error-constants';
import {
  isCompatible,
  createAudioContext,
  attachAnalyzerToAudioElement,
  getContext,
  getAnalyser
} from './audio-context';


const BARS = 32;
const FPS = 1;

function runDemo() {
  const trackPickerEl = <HTMLElement>document.querySelector('.track-picker');
  const effectPickerEl = <HTMLElement>document.querySelector('.effect-picker');
  const audioElement = <HTMLAudioElement>document.querySelector('audio');

  createAudioContext();
  attachAnalyzerToAudioElement(audioElement);
  const analyser = getAnalyser();

  const stream = Observable.fromEvent(trackPickerEl, 'change')
    .map((event: Event) => (<HTMLSelectElement>event.target).value)
    .do((url: string) => {
      if (url) {
        console.log(`Audio track selected: "${url}"`);
      } else {
        console.log('No audio track selected');
      }
      audioElement.src = url;
    })
    .mergeMap(() => {
      return Observable.create((observer: Observer<boolean>) => {
        audioElement.oncanplay = () => observer.next(true);
        audioElement.onerror = (err) => {
          if (audioElement.src && audioElement.src !== location.href) {
            observer.error({ code: ErrorCodes.LOADING_FAILED, debug: err });
          } // otherwise src was set to ""
        };
      });
    })
    .mergeMap(() => {
      return Observable.interval( Math.round( 1000 / FPS ) )
      .map(() => {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        return dataArray;
      });
    })
  ;

  stream.subscribe(
    (data) => {
      console.log(data);
    },
    (err: iError) => {
      const { code, debug } = err;
      if (code !== undefined && debug !== undefined) {
        console.error(ErrorMessages[ code ], debug);
      } else {
        console.error('Unrecognized error:', debug);
      }
    }
  );




}


window.addEventListener('load', runDemo);
