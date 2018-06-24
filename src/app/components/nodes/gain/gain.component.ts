import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../../models/node-model';

@Component({
  selector: 'app-gain',
  template: `
    <input type="range" min="0" max="1" step=".01" [(ngModel)]="gain" (change)="onGain()">
  `,
  styles: []
})
export class GainComponent implements OnInit {
  @Input() node: Node;
  public gain = 1;

  constructor() {}

  ngOnInit() {}

  onGain() {
    (<GainNode>this.node.node).gain.value = this.gain;
  }
}
