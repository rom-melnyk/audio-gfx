import { Component, Input, OnInit } from '@angular/core';
import { DelayNodeComplex } from '../../../models/delay-node-complex';

@Component({
  selector: 'app-delay',
  template: `
    <app-form [fields]="nodeComplex.config"></app-form>
  `,
  styles: []
})
export class DelayComponent implements OnInit {
  @Input() nodeComplex: DelayNodeComplex;

  constructor() {}

  ngOnInit() {}
}
