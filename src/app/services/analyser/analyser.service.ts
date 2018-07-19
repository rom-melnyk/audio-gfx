import { Injectable } from '@angular/core';
import { Observable, Observer, Subscriber } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { NodeTypes, Defaults } from '../../constants';
import { AnalyserNodeComplex } from '../../models/analyser-node-complex';
import { AnalyserModes } from '../../constants';

const MODULE_NAME = 'AnalyserService';

interface IAnalyserProps {
  mode?: AnalyserModes;
  interval?: number;
  fftSize?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyserService {
  private store: Array<{ node: AnalyserNodeComplex, observable: AnalyserObservable }> = [];

  constructor() {}

  getObservable(node: AnalyserNodeComplex): Observable<Uint8Array> {
    const index = this.findStoreIndexByNode(node);
    if (this.store[index]) {
      return this.store[index].observable.observable;
    }

    console.error(`[ ${MODULE_NAME}::getObservable() ] no entry found for this node`, node);
    return null;
  }

  setup(node: AnalyserNodeComplex, props: IAnalyserProps): Observable<Uint8Array> {
    const index = this.findStoreIndexByNode(node);
    if (this.store[index]) {
      console.error(`[ ${MODULE_NAME}::setup() ] entry already exists for this node`, node);
      return null;
    }

    const observable = new AnalyserObservable(node, props);
    this.store.push({ node, observable });
    return observable.observable;
  }

  update(node: AnalyserNodeComplex, props: IAnalyserProps): void {
    const index = this.findStoreIndexByNode(node);
    if (this.store[index]) {
      const { observable } = this.store[index];
      Object.assign(observable, props);
    } else {
      console.error(`[ ${MODULE_NAME}::update() ] no entry found for this node`, node);
    }
  }

  tearDown(node: AnalyserNodeComplex, subscriber: Subscriber<any>): void {
    const index = this.findStoreIndexByNode(node);
    if (this.store[index]) {
      const { observable } = this.store[index];
      observable.tearDown(subscriber);
      this.store.splice(index, 1);
    } else {
      console.error(`[ ${MODULE_NAME}::tearDown() ] no entry found for this node`, node);
    }
  }

  private findStoreIndexByNode(node: AnalyserNodeComplex): number {
    return this.store.findIndex((item) => node === item.node);
  }
}


class AnalyserObservable implements IAnalyserProps {
  private observer: Observer<any> = null;
  public observable: Observable<Uint8Array> = null;
  public mode: AnalyserModes;
  public interval: number;

  private _fftSize: number;
  public set fftSize(x) {
    this._fftSize = x;
    (<AnalyserNode>this.node.node).fftSize = this._fftSize;
  }
  public get fftSize() {
    return this._fftSize;
  }

  constructor(
    private node: AnalyserNodeComplex,
    props: IAnalyserProps,
  ) {
    this.mode = props.mode;
    this.interval = props.interval;
    this.fftSize = props.fftSize;

    this.tick = this.tick.bind(this);

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
        previousSum = data[1];
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
