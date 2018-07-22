import { Component, OnInit, OnDestroy, Input, ElementRef, } from '@angular/core';
import { AnalyserService } from '../../../../services/analyser/analyser.service';
import { AnalyserNodeComplex } from '../../../../models/analyser-node-complex';

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
export class CanvasComponent implements OnInit, OnDestroy {
  private canvas: HTMLCanvasElement = null;
  private ctx: CanvasRenderingContext2D = null;
  private gapFactor = .1;
  private colorize: boolean;

  public width;
  public height;

  @Input() nodeComplex: AnalyserNodeComplex = null;

  constructor(
    private analyserService: AnalyserService,
    private hostElement: ElementRef,
  ) { }

  ngOnInit() {
    this.canvas = this.hostElement.nativeElement.querySelector('canvas');
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext('2d');

    this.analyserService.setup(this.nodeComplex, (data: Uint8Array) => {
      this.drawBars(data);
    });

    this.nodeComplex.configurables.colorize.onChange = (value) => {
      this.colorize = <boolean>value;
    };
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

  ngOnDestroy() {
    this.analyserService.tearDown(this.nodeComplex);
  }
}
