import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';

import { ErrorMessages, iError } from './error-constants';
import { audioContextStream } from './audio-context';
import { AudioElement } from './audio-element';


function runDemo() {
  const trackPickerEl = <HTMLElement>document.querySelector('.track-picker');
  const effectPickerEl = <HTMLElement>document.querySelector('.effect-picker');

  const audioElement = new AudioElement( <HTMLAudioElement>document.querySelector('audio') );
  //
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
    .mergeMap(() => audioElement.updateSourceStream())
    .combineLatest(audioContextStream())
  ;

  stream.subscribe(
    (data) => {
      console.log(data);
    },
    (err: iError) => {
      const { code, debug } = err;
      console.error(ErrorMessages[code], debug);
    }
  );




}


window.addEventListener('load', runDemo);
