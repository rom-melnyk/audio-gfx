import { Component, OnInit, Input } from '@angular/core';
import { BiquadFilterNodeComplex } from '../../../models/biquad-filter-node-complex';

@Component({
  selector: 'app-biquad-filter',
  template: `
    <app-form [fields]="nodeComplex.config"></app-form>
  `,
  styles: []
})
export class BiquadFilterComponent implements OnInit {
  @Input() nodeComplex: BiquadFilterNodeComplex;

  constructor() {}

  ngOnInit() {}
}
