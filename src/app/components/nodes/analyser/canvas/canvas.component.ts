import { Component, OnInit, OnChanges, OnDestroy, Input, ElementRef, SimpleChanges, SimpleChange } from '@angular/core';
import { AnalyserService } from '../../../../services/analyser/analyser.service';
import { Node } from '../../../../models/node-model';
import { Subscriber } from 'rxjs';
import { AnalyserModes } from '../../../../constants';

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
  private subscriber: Subscriber<any> = null;
  public width;
  public height;

  @Input() node: Node = null;
  @Input() mode: AnalyserModes;
  @Input() colorize: boolean;
  @Input() interval: number;

  constructor(
    private analyserService: AnalyserService,
    private hostElement: ElementRef,
  ) { }

  ngOnInit() {
    this.canvas = this.hostElement.nativeElement.querySelector('canvas');
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext('2d');

    this.analyserService.setup(this.node);
    this.subscriber = <Subscriber<any>>this.analyserService.getObservable().subscribe((data: Uint8Array) => {
      console.log('tick');
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
    const modeChange = (<{ mode: SimpleChange }>changes).mode;
    if (modeChange) {
      this.analyserService.mode = modeChange.currentValue;
    }

    const intervalChange = (<{ interval: SimpleChange }>changes).interval;
    if (intervalChange) {
      this.analyserService.interval = intervalChange.currentValue;
    }
  }

  ngOnDestroy() {
    this.analyserService.tearDown(this.subscriber);
  }
}
