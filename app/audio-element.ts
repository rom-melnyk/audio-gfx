import { Observable, Observer } from 'rxjs';
import { ErrorCodes } from './error-constants';


class AudioElement {
  private element: HTMLAudioElement;
  private _src: string = '';

  constructor(el: HTMLAudioElement) {
    this.element = el;
  }

  updateSourceStream(): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.element.oncanplay = () => observer.next(true);
      this.element.onerror = (err) => {
        if (this.element.src && this.element.src !== location.href) {
          observer.error({ code: ErrorCodes.LOADING_FAILED, debug: err });
        }
      };
    });
  }

  get src() { return this._src; }

  set src(url) {
    this._src = url;
    this.element.src = url;
  }
}


export { AudioElement };
