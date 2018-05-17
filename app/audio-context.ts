import { ErrorCodes } from './error-constants';
import { Observable, Observer } from 'rxjs/Rx';


function audioContextStream(): Observable<AudioContext> {
  const AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
  return Observable.create((observer: Observer<AudioContext>) => {
    try {
      observer.next(new AudioContext());
    } catch (e) {
      observer.error({ code: ErrorCodes.NOT_SUPPORTED, debug: e });
    }
  });
}


export { audioContextStream };
