import { Injectable } from '@angular/core';
import { Observable, Observer, Subscriber } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { NodeTypes, Defaults } from '../../constants';
import { Node } from '../../models/node-model';
import { AnalyserModes } from '../../constants';


@Injectable({
  providedIn: 'root'
})
export class AnalyserService {
  private observable: Observable<Uint8Array> = null;
  private observer: Observer<any> = null;
  public interval = Defaults[NodeTypes.AnalyserNode].DEFAULT_INTERVAL;
  public mode: AnalyserModes = AnalyserModes.BARS;

  constructor() {
    this.tick = this.tick.bind(this);
  }

  getObservable() {
    return this.observable;
  }

  setup(node: Node) {
    const analyser = <AnalyserNode>node.node;
    let previousSum = 1;

    this.observable = Observable.create((observer: Observer<any>) => {
      this.observer = observer;
      this.tick();
    }).pipe(
      map(() => {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        if (this.mode === AnalyserModes.BARS) {
          analyser.getByteFrequencyData(dataArray); // for bars
        } else {
          analyser.getByteTimeDomainData(dataArray); // for waveform
        }
        const sum = Array.prototype.reduce.call(dataArray, (acc, x) => acc + x, 0);
        return [dataArray, sum];
      }),
      filter((data: [ Uint8Array, number ]) => {
        const sum = data[1];
        return previousSum !== 0 || sum !== 0;
      }),
      tap((data: [ Uint8Array, number ]) => {
        const sum = data[1];
        previousSum = sum;
      }),
      map((data: [ Uint8Array, number ]) => data[0])
    );
  }

  tearDown(subscriber: Subscriber<any>) {
    this.observer.complete();
    this.observer = null;
    subscriber.unsubscribe();
    this.observable = null;
  }

  private tick() {
    if (this.observer) {
      this.observer.next(null);
      setTimeout(this.tick, this.interval);
    }
  }
}
