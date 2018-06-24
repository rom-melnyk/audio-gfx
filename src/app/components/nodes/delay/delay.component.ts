import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../../models/node-model';
import { NodeTypes, Defaults } from '../../../constants';

@Component({
  selector: 'app-delay',
  template: `
    <input type="range" min="0" max={{maxDelay}} step=".1" [(ngModel)]="delay" (change)="onGain()">
  `,
  styles: []
})
export class DelayComponent implements OnInit {
  @Input() node: Node;
  public delay = 0;
  public readonly maxDelay = Defaults[NodeTypes.DelayNode].MAX_DELAY;

  constructor() {}

  ngOnInit() {}

  onGain() {
    (<DelayNode>this.node.node).delayTime.value = this.delay;
  }
}
