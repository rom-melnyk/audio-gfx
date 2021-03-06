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
  attachAnalyserToAudioElement,
  getContext,
  getAnalyser
} from './audio-context';
import { Visualizer } from './visualizer';


const FFT_SIZE = 128;
const FPS = 25;


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
  const trackPickerEl = <HTMLSelectElement>document.querySelector('.track-picker');
  const effectPickerEl = <HTMLSelectElement>document.querySelector('.effect-picker');
  const audioElement = <HTMLAudioElement>document.querySelector('audio');
  const rangeElement = <HTMLInputElement>document.querySelector('input[type=range]');

  const canvasOriginal = <HTMLCanvasElement>document.querySelector('.visualization.original canvas');
  const canvasModified = <HTMLCanvasElement>document.querySelector('.visualization.modified canvas');
  const visualizerOriginal = new Visualizer(canvasOriginal);
  const visualizerModified = new Visualizer(canvasModified);

  createAudioContext();
  attachAnalyserToAudioElement(audioElement, { fftSize: FFT_SIZE });
  const analyser = getAnalyser();

  const bassThreshold = Math.round(analyser.frequencyBinCount * .33);
  const trebleThreshold = Math.round(analyser.frequencyBinCount * .67);

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

  // -------- keypress analyser --------
  const keyUpStream = Observable.fromEvent(window, 'keyup')
    .mapTo(false);
  const keyDownStream = Observable.fromEvent(window, 'keydown')
    .map((e: Event) => (<KeyboardEvent>e).shiftKey);
  const kbdStream = Observable.of(false) // initial value
    .merge(keyUpStream)
    .merge(keyDownStream)
    .do((v: boolean) => {
      if (v) {
        console.info('Shift is pressed');
      }
    });

  // -------- effect picker --------
  const effectStream = Observable.of(effectPickerEl.value)
    .merge(
      Observable.fromEvent(effectPickerEl, 'change')
      .map((event: Event) => (<HTMLSelectElement>event.target).value)
    )
    .do((value: string) => {
      console.log(`Modified visualizer should reflect "${value}"`);
    });

  // -------- threshold change --------
  const thresholdStream = Observable.of(+rangeElement.value)
    .merge(
      Observable.fromEvent(rangeElement, 'change')
        .map((event: Event) => +(<HTMLInputElement>event.target).value)
    )
    .do((value: number) => {
      console.log(`Threshold set to "${value}"`);
    });

  // -------- poll the analyser --------
  const analyserCache: boolean[] = [];
  const analyserCacheLength = 3;
  const analyserStream = Observable.interval( Math.round( 1000 / FPS ) )
    .map(() => {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray); // for bars
      // analyser.getByteTimeDomainData(dataArray); // for waveform
      return dataArray;
    })
    .do((data: Uint8Array) => {
      if (analyserCache.length === analyserCacheLength) {
        analyserCache.shift();
      }
      const hasCurrentAnalyserData = data.some((val: number) => val > 0);
      analyserCache.push(hasCurrentAnalyserData);
    })
    .filter(() => analyserCache.some((hasData: boolean) => hasData));

  analyserStream.combineLatest(kbdStream)
    .do((data: [Uint8Array, boolean]) => {
      // console.info(data);
      const [ analyserData, isShiftPressed ] = data;
      visualizerOriginal.drawBars(analyserData, isShiftPressed);
    })
    .subscribe(emptyHandler, errorHandler);

  const analyserStreamWithEffect = analyserStream
    .combineLatest(effectStream, thresholdStream)
    .map((data: [Uint8Array, string, number]): [Uint8Array, string, number] => {
      const [ analyserData, effect, threshold ] = data;
      let newAnalyserData;
      switch (effect) {
        case 'bass':
          newAnalyserData = analyserData.slice(0, bassThreshold);
          break;
        case 'mid':
          newAnalyserData = analyserData.slice(bassThreshold, trebleThreshold);
          break;
        case 'treble':
          newAnalyserData = analyserData.slice(trebleThreshold);
          break;
        default /* 'all' */ : newAnalyserData = analyserData;
      }
      return [ newAnalyserData, effect, threshold ];
    })
    .filter((data: [Uint8Array, string, number]) => {
      const [ analyserData, , threshold ] = data;
      const average = analyserData.reduce((acc: number, val: number) => val + acc, 0) / analyserData.length;
      return average > threshold;
    })
    .map((data: [Uint8Array, string, number]) => {
      const [ analyserData, effect ] = data;
      let newAnalyserData: number[];
      switch (effect) {
        case 'bass':
          newAnalyserData = [...analyserData].concat(
            Array(analyser.frequencyBinCount - bassThreshold).fill(0)
          );
          break;
        case 'mid': newAnalyserData = Array(bassThreshold).fill(0)
          .concat([...analyserData])
          .concat( Array(analyser.frequencyBinCount - trebleThreshold).fill(0) );
          break;
        case 'treble':
          newAnalyserData = Array(trebleThreshold).fill(0).concat([...analyserData]);
          break;
        default /* 'all' */ : newAnalyserData = [...analyserData];
      }
      return {
        timestamp: Date.now(),
        analyserData: newAnalyserData
      };
    });

  Observable.interval( Math.round( 1000 / FPS ) )
    .map(() => { return { timestamp: Date.now() }; })
    .combineLatest(analyserStreamWithEffect)
    .map((data) => {
      const [ { timestamp }, { timestamp: analyserTimestamp, analyserData } ] = data;
      if (analyserTimestamp > timestamp) {
        return analyserData;
      }
      return analyserData.map((v) => {
        if (v < 1 && v !== 0 || timestamp - analyserTimestamp > 1000) return 0;
        const fading = 1 - (timestamp - analyserTimestamp) / 1000;
        return v * fading;
      });
    })
    .combineLatest(kbdStream)
    .do((data: [number[], boolean]) => {
      const [ analyserData, isShiftPressed ] = data;
      visualizerModified.drawBars(analyserData, isShiftPressed);
    })
    .subscribe(emptyHandler, errorHandler);
}


window.addEventListener('load', runDemo);
