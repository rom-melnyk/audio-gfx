import { Observable, Observer } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/merge';
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
import { Visualizer } from './visualizer';


const BARS = 32;
const FPS = 16;


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

  const canvasOriginal = <HTMLCanvasElement>document.querySelector('.visualization.original canvas');
  const canvasModified = <HTMLCanvasElement>document.querySelector('.visualization.modified canvas');
  const visualizerOriginal = new Visualizer(canvasOriginal);
  const visualizerModified = new Visualizer(canvasModified);

  createAudioContext();
  attachAnalyzerToAudioElement(audioElement);
  const analyser = getAnalyser();

  // -------- prepare audio files --------
  fetch('./audio/audio-src.json')
    .then((res: Response) => res.json())
    .then((files: string[]) => {
      console.log(`${files.length} audio file(-s) detected`);
      files.forEach((f: string) => {
        const optionEl = document.createElement('option');
        optionEl.value = './audio/' + f;
        optionEl.innerText = f.replace(/_/g, ' ');
        trackPickerEl.appendChild(optionEl);
      });
    })
    .catch(console.error);

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

  // -------- keypress analyzer --------
  const keyUpStream = Observable.fromEvent(window, 'keyup')
    .mapTo(false);
  const keyDownStream = Observable.fromEvent(window, 'keydown')
    .map((e: Event) => (<KeyboardEvent>e).shiftKey);
  const kbdStream = Observable.of(false) // initial value
    .merge(keyUpStream)
    .merge(keyDownStream)
    .do((v: boolean) => console.info(`Shift is ${ v ? '' : 'not' } pressed`));

  // -------- poll the analyser --------
  const analyzerCache: boolean[] = [];
  const analyzerCacheLength = 3;
  Observable.interval( Math.round( 1000 / FPS ) )
    .map(() => {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray); // for bars
      // analyser.getByteTimeDomainData(dataArray); // for waveform
      return dataArray;
    })
    .do((data: Uint8Array) => {
      if (analyzerCache.length === analyzerCacheLength) {
        analyzerCache.shift();
      }
      const hasCurrentAnalyzerData = data.some((val: number) => val > 0);
      analyzerCache.push(hasCurrentAnalyzerData);
    })
    .filter(() => analyzerCache.some((hasData: boolean) => hasData))
    .combineLatest(kbdStream)
    .do((data: [Uint8Array, boolean]) => {
      // console.info(data);
      const [ analyzerData, isShiftPressed ] = data;
      visualizerOriginal.drawBars(analyzerData, isShiftPressed);
    })
    .subscribe(emptyHandler, errorHandler);


}


window.addEventListener('load', runDemo);
