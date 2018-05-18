import { Observable, Observer } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/filter';

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


function nextHandler (data: any): void {
  console.log(data);
}

function emptyHandler() {}

function errorHandler (err: iError): void {
  const { code, debug } = err;
  if (code !== undefined && debug !== undefined) {
    console.error(ErrorMessages[ code ], debug);
  } else {
    console.error('Unrecognized error:', debug);
  }
}


function runDemo() {
  const trackPickerEl = <HTMLElement>document.querySelector('.track-picker');
  const effectPickerEl = <HTMLElement>document.querySelector('.effect-picker');
  const audioElement = <HTMLAudioElement>document.querySelector('audio');

  createAudioContext();
  attachAnalyzerToAudioElement(audioElement);
  const analyser = getAnalyser();

  // -------- track change --------
  Observable.fromEvent(trackPickerEl, 'change')
    .map((event: Event) => (<HTMLSelectElement>event.target).value)
    .do((url: string) => {
      if (url) {
        console.log(`Audio track selected: "${url}"`);
      } else {
        console.log('No audio track selected');
      }
      audioElement.src = url;
    })
    .subscribe(emptyHandler, errorHandler);

  // -------- can play? --------
  Observable.create((observer: Observer<boolean>) => {
      audioElement.addEventListener('canplay', () => observer.next(true));
      audioElement.addEventListener('error', (err) => {
        if (audioElement.src && audioElement.src !== location.href) {
          observer.error({ code: ErrorCodes.LOADING_FAILED, debug: err });
        } // otherwise src was set to ""
      });
    })
    .subscribe(emptyHandler, errorHandler);

  // -------- does it play? --------
  const playStream = Observable.create((observer: Observer<boolean>) => {
    audioElement.addEventListener('play', () =>observer.next(true));
    audioElement.addEventListener('pause', () =>observer.next(false));
    audioElement.addEventListener('ended', () =>observer.next(false));
    audioElement.addEventListener('error', () =>observer.next(false));
  });

  // -------- poll the analyser --------
  Observable.interval( Math.round( 1000 / FPS ) )
    .map(() => {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      return dataArray;
    })
    .combineLatest(playStream)
    // .do(console.info)
    .filter((data: any) => { const [ , isPlaying ] = <[Uint8Array, boolean]>data; return isPlaying; })
    .map((data: any) => { const [ analyserData ] = <[Uint8Array, boolean]>data; return analyserData; })
    .do(console.warn)
    .subscribe(emptyHandler, errorHandler);


}


window.addEventListener('load', runDemo);
