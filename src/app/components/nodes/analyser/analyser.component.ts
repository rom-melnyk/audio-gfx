import { Component, OnInit, Input } from '@angular/core';
import { AnalyserNodeComplex } from '../../../models/analyser-node-complex';
import { NodeTypes, AnalyserModes, Defaults } from '../../../constants';

@Component({
  selector: 'app-analyser',
  templateUrl: './analyser.component.html',
  styleUrls: ['./analyser.component.scss']
})
export class AnalyserComponent implements OnInit {
  @Input() node: AnalyserNodeComplex;

  public isSetupVisible = false;
  public mode: AnalyserModes = AnalyserModes.BARS;
  public colorize = false;
  public interval = Defaults[NodeTypes.AnalyserNode].DEFAULT_INTERVAL;
  public fftSize = 6;

  public get exportFftSize() {
    return Math.pow(2, this.fftSize);
  }

  constructor() { }

  ngOnInit() {
  }

  onToggleSetup() {
    this.isSetupVisible = !this.isSetupVisible;
  }
}
