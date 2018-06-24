import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../../models/node-model';

@Component({
  selector: 'app-analyser',
  templateUrl: './analyser.component.html',
  styleUrls: ['./analyser.component.scss']
})
export class AnalyserComponent implements OnInit {
  @Input() node: Node;

  public isSetupVisible = false;
  public type = 'bars'; // or 'waveform'

  constructor() { }

  ngOnInit() {
  }

  onToggleSetup() {
    this.isSetupVisible = !this.isSetupVisible;
  }
}
