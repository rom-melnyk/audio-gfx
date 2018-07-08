import { Component, OnInit, Input } from '@angular/core';
import { InputAbstract } from '../input-abstract';
import { INumberInput } from '../input-interfaces';

@Component({
  selector: 'app-input-number',
  template: `
    <div class="form-section" [class.invalid]="!validate(value)" [class.is-last]="isLast">
      <div class="label" [innerHTML]="label"></div>
      <div class="input-wrapper">
        <input type="range" min="{{min}}" max="{{max}}" step="{{step}}" (change)="onChange(value)" [(ngModel)]="value">
        <div class="error-message" [innerHTML]="errorMessage"></div>
      </div>
    </div>
  `
})
export class InputNumberComponent extends InputAbstract implements OnInit {
  @Input() config: INumberInput;
  public min: number;
  public max: number;
  public step: number;
  public value: number;

  constructor() {
    super();
  }

  ngOnInit() {
    const [min, max, step = 1] = <number[]>this.config.limits;
    this.min = Math.min(min, max);
    this.max = Math.max(min, max);
    this.step = step;

    if (typeof this.config.default !== 'undefined') {
      this.value = this.config.default;
    } else {
      const steps = (max - min) / step;
      this.value = min + Math.round( steps / 2) * step;
    }

    super.ngOnInit();
  }
}
