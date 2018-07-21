import { Component, OnInit, OnChanges, OnDestroy, Input, ElementRef, SimpleChanges, SimpleChange } from '@angular/core';
import { AnalyserService } from '../../../../services/analyser/analyser.service';
import { AnalyserNodeComplex, AnalyserModes } from '../../../../models/analyser-node-complex';
import { Observable, Subscriber } from 'rxjs';

const DEFAULT_COLOR = 'hsl(210, 10%, 80%)';

@Component({
  selector: 'app-canvas',
  template: '<canvas width="{{width}}" height="{{height}}"></canvas>',
  styles: [
    `canvas {
      width: 100%;
      height: 8rem;
      margin-top: .5rem;
    }`
  ]
})
export class CanvasComponent implements OnInit, OnChanges, OnDestroy {
  private canvas: HTMLCanvasElement = null;
  private ctx: CanvasRenderingContext2D = null;
  private gapFactor = .1;
  private observable: Observable<Uint8Array> = null;
  private subscriber: Subscriber<any> = null;
  public width;
  public height;

  @Input() node: AnalyserNodeComplex = null;
  @Input() mode: AnalyserModes;
  @Input() colorize: boolean;
  @Input() interval: number;
  @Input() fftSize: number;

  constructor(
    private analyserService: AnalyserService,
    private hostElement: ElementRef,
  ) { }

  ngOnInit() {
    this.canvas = this.hostElement.nativeElement.querySelector('canvas');
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext('2d');

    this.observable = this.analyserService.setup(this.node, { mode: this.mode, interval: this.interval, fftSize: this.fftSize });
    this.subscriber = <Subscriber<any>>this.observable.subscribe((data: Uint8Array) => {
      this.drawBars(data);
    });
  }

  drawBars(data: Uint8Array | number[]) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const n = data.length;
    // n * barWidth + (n + 1) * barWidth * gapFactor = width;
    // barWidth = width / (n + (n + 1) * gapFactor);
    const barWidth = this.width / (n + (n + 1) * this.gapFactor);
    const gapWidth = barWidth * this.gapFactor;

    for (let i = 0; i < n; i++) {
      const barHeight = data[ i ] / 256 * ( this.height - 2 * gapWidth );
      this.ctx.fillStyle = this.colorize
        ? `hsl(${ Math.floor(360 * i / n) }, 50%, 50%)`
        : DEFAULT_COLOR;
      this.ctx.fillRect(
        gapWidth + (barWidth + gapWidth) * i,
        (this.height - barHeight) / 2,
        barWidth,
        barHeight,
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.observable) {
      return;
    }

    const modeChange = (<{ mode: SimpleChange }>changes).mode;
    if (modeChange) {
      this.analyserService.update(this.node, { mode: modeChange.currentValue });
    }

    const intervalChange = (<{ interval: SimpleChange }>changes).interval;
    if (intervalChange) {
      this.analyserService.update(this.node, { interval: intervalChange.currentValue });
    }

    const fftSizeChange = (<{ fftSize: SimpleChange }>changes).fftSize;
    if (fftSizeChange) {
      this.analyserService.update(this.node, { fftSize: fftSizeChange.currentValue });
    }
  }

  ngOnDestroy() {
    this.analyserService.tearDown(this.node, this.subscriber);
    this.subscriber = null;
    this.observable = null;
  }
}
