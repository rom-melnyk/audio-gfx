import { Component, OnInit, Input } from '@angular/core';
import { AnalyserNodeComplex } from '../../../models/analyser-node-complex';

@Component({
  selector: 'app-analyser',
  template: `
    <div class="setup">
      <button (click)="onToggleSetup();">&#x2699;</button>
    </div>
    <section *ngIf="isSetupVisible">
      <app-form [fields]="nodeComplex.config"></app-form>
    </section>
    <app-canvas [nodeComplex]="nodeComplex"></app-canvas>
  `,
  styles: [
    '.setup { margin: 0 0 .5rem; }',
  ]
})
export class AnalyserComponent implements OnInit {
  @Input() nodeComplex: AnalyserNodeComplex;
  public isSetupVisible = false;

  constructor() { }

  ngOnInit() {
  }

  onToggleSetup() {
    this.isSetupVisible = !this.isSetupVisible;
  }
}
