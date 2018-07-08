import { Component, OnInit, Input } from '@angular/core';
import { INumberInput } from '../form-config';

@Component({
  selector: 'app-input-number',
  template: `
    <div class="form-section" [class.invalid]="!validate()">
      <div class="label">{{label}}</div>
      <div class="input-wrapper">
        <input type="range" min="{{min}}" max="{{max}}" step="{{step}}" (change)="onChange(value)" [(ngModel)]="value">
        <div class="error-message">{{errorMessage}}</div>
      </div>
    </div>
  `
})
export class InputNumberComponent implements OnInit {
  @Input() config: INumberInput;
  @Input() onChange: (value: any) => void;
  public min: number;
  public max: number;
  public step: number;
  public value: number;
  public label = 'Number';
  public errorMessage = 'Incorrect value';

  constructor() { }

  ngOnInit() {
    const [min, max, step = 1] = <number[]>this.config.limits;
    this.min = Math.min(min, max);
    this.max = Math.max(min, max);
    this.step = step;

    const { label, default: def, errorMessage, validate } = this.config;
    if (typeof def !== 'undefined') {
      this.value = def;
    } else {
      const steps = (max - min) / step;
      this.value = min + Math.round( steps / 2) * step;
    }
    if (typeof label !== 'undefined') {
      this.label = label;
    }
    if (typeof errorMessage !== 'undefined') {
      this.errorMessage = errorMessage;
    }
    if (typeof validate !== 'undefined') {
      this.validate = validate;
    }

    this.onChange(this.value);
  }

  public validate(): boolean {
    return true;
  }
}
