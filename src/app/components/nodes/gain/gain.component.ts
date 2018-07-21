import { Component, OnInit, Input } from '@angular/core';
import { GainNodeComplex } from '../../../models/gain-node-complex';

@Component({
  selector: 'app-gain',
  template: `
    <app-form [fields]="nodeComplex.config"></app-form>
  `,
  styles: []
})
export class GainComponent implements OnInit {
  @Input() nodeComplex: GainNodeComplex;

  constructor() {}

  ngOnInit() {}
}
