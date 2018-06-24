import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../../models/node-model';
import { NodeTypes, AnalyserModes, Defaults } from '../../../constants';

@Component({
  selector: 'app-analyser',
  templateUrl: './analyser.component.html',
  styleUrls: ['./analyser.component.scss']
})
export class AnalyserComponent implements OnInit {
  @Input() node: Node;

  public isSetupVisible = false;
  public mode: AnalyserModes = AnalyserModes.BARS;
  public colorize = false;
  public interval = Defaults[NodeTypes.AnalyserNode].DEFAULT_INTERVAL;

  constructor() { }

  ngOnInit() {
  }

  onToggleSetup() {
    this.isSetupVisible = !this.isSetupVisible;
  }
}
