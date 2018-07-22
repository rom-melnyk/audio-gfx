import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { AnalyserNodeComplex, AnalyserModes } from '../../models/analyser-node-complex';

const MODULE_NAME = 'AnalyserService';

@Injectable({
  providedIn: 'root'
})
export class AnalyserService {
  private store: Array<AnalyserObservable> = [];

  constructor() {}

  setup(nodeComplex: AnalyserNodeComplex, callback: (data: Uint8Array) => void) {
    const index = this.findStoreIndexByNode(nodeComplex);
    if (this.store[index]) {
      console.error(`[ ${MODULE_NAME}::setup() ] entry already exists for this nodeComplex`, nodeComplex);
      return null;
    }

    const observable = new AnalyserObservable(nodeComplex, callback);
    this.store.push(observable);
  }

  tearDown(node: AnalyserNodeComplex): void {
    const index = this.findStoreIndexByNode(node);
    const observable = this.store[index];
    if (observable) {
      observable.tearDown();
      this.store.splice(index, 1);
    } else {
      console.error(`[ ${MODULE_NAME}::tearDown() ] no entry found for this node`, node);
    }
  }

  private findStoreIndexByNode(nodeComplex: AnalyserNodeComplex): number {
    return this.store.findIndex((item) => nodeComplex === item.nodeComplex);
  }
}


class AnalyserObservable {
  private observer: Observer<any> = null;
  private observable: Observable<Uint8Array> = null;
  private subscription: Subscription = null;

  private mode: AnalyserModes;
  private interval: number;
  private fftSize: number; // for the matter of consistency
  private smoothingTimeConstant: number;
  private minDecibels: number;
  private maxDecibels: number;

  constructor(
    public nodeComplex: AnalyserNodeComplex,
    callback: (data: Uint8Array) => void
  ) {
    this.mode = <AnalyserModes>nodeComplex.configurables.mode.default;
    this.interval = nodeComplex.configurables.interval.default;
    this.fftSize = nodeComplex.configurables.fftSize.default;
    this.smoothingTimeConstant = nodeComplex.configurables.smoothingTimeConstant.default;
    this.minDecibels = nodeComplex.configurables.minDecibels.default;
    this.maxDecibels = nodeComplex.configurables.maxDecibels.default;

    this.tick = this.tick.bind(this);

    const analyser = <AnalyserNode>nodeComplex.node;

    // onChange() handlers
    nodeComplex.configurables.mode.onChange = (value) => {
      this.mode = <AnalyserModes>value;
    };
    nodeComplex.configurables.interval.onChange = (value) => {
      this.interval = Number(value);
    };
    nodeComplex.configurables.fftSize.onChange = (value) => {
      analyser.fftSize = Math.pow(2, Number(value));
    };
    // set correct startup fftSize
    nodeComplex.configurables.fftSize.onChange(
      nodeComplex.configurables.fftSize.default
    );
    nodeComplex.configurables.smoothingTimeConstant.onChange = (value) => {
      analyser.smoothingTimeConstant = Number(value);
    };
    nodeComplex.configurables.minDecibels.onChange = (value) => {
      const v = Number(value);
      if (nodeComplex.configurables.minDecibels.validate(v)) {
        this.minDecibels = v;
        analyser.minDecibels = v;
      }
    };
    nodeComplex.configurables.maxDecibels.onChange = (value) => {
      const v = Number(value);
      if (nodeComplex.configurables.maxDecibels.validate(v)) {
        this.maxDecibels = v;
        analyser.maxDecibels = Number(value);
      }
    };
    nodeComplex.configurables.minDecibels.validate = (value: number) => {
      return value < this.maxDecibels;
    };
    nodeComplex.configurables.maxDecibels.validate = (value: number) => {
      return value > this.minDecibels;
    };


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

    this.subscription = this.observable.subscribe(callback);
  }

  tearDown() {
    this.observer.complete();
    this.observer = null;
    this.subscription.unsubscribe();
    this.observable = null;
  }

  private tick() {
    if (this.observer) {
      this.observer.next(null);
      setTimeout(this.tick, this.interval);
    }
  }
}
