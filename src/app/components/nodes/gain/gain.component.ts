import { Component, OnInit, Input } from '@angular/core';
import { GainNodeComplex } from '../../../models/gain-node-complex';

@Component({
  selector: 'app-gain',
  template: `
    <app-form [fields]="node.config"></app-form>
  `,
  styles: []
})
export class GainComponent implements OnInit {
  @Input() node: GainNodeComplex;

  constructor() {}

  ngOnInit() {}
}
