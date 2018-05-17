import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ErrorCodes, ErrorMessages } from './error-constants';
import { initAudioContext } from './init-audio-context';


function runDemo() {
  const trackPickerEl = <HTMLElement>document.querySelector('.track-picker');
  const effectPickerEl = <HTMLElement>document.querySelector('.effect-picker');
  const audioEl = <HTMLElement>document.querySelector('audio');

  const stream = Observable.fromEvent(trackPickerEl, 'change')
    .map((event: Event) => (<HTMLSelectElement>event.target).value)
    .do(console.log);

  stream.subscribe(
    (data) => {
    // console.log(data);
    },
    (data) => {
      console.error(data)
    }
  );




  initAudioContext()
    .then((context) => {

    })
    .catch((err) => {
      const { code, debug } = err;
      console.error(ErrorMessages[code]);
      console.error(debug);
    });
}


window.addEventListener('load', runDemo);
