class Visualizer {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private gapFactor: number;


  constructor(private canvas: HTMLCanvasElement) {
    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    this.gapFactor = .1;
  }

  drawBars(data: Uint8Array) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const n = data.length;
    // n * barWidth + (n + 1) * barWidth * gapFactor = width;
    // barWidth = width / (n + (n + 1) * gapFactor);
    const barWidth = this.width / (n + (n + 1) * this.gapFactor);
    const gapWidth = barWidth * this.gapFactor;

    for (let i = 0; i < n; i++) {
      const barHeight = data[ i ] / 256 * ( this.height - 2 * gapWidth );
      this.ctx.fillStyle = 'hsl(210, 10%, 80%)';
      this.ctx.fillRect(
        gapWidth + (barWidth + gapWidth) * i,
        (this.height - barHeight) / 2,
        barWidth,
        barHeight,
      );
    }
  }
}


export { Visualizer };
