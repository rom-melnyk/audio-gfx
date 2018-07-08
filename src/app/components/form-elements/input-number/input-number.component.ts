import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { INumberInput } from '../form-config';

@Component({
  selector: 'app-input-number',
  template: `
    <div class="form-section" [class.invalid]="!validate()">
      <div class="label">{{label}}</div>
      <div class="input-wrapper">
        <input type="range" min="min" max="max" step="step" (change)="onChange($event)" value="dataValue">
        <div class="error-message">{{errorMessage}}</div>
      </div>
    </div>
  `,
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit {
  @Input() config: INumberInput;
  @Input() onChange: (value: any) => void;
  @Output() value = new EventEmitter<number>();
  public min = 0;
  public max = 100;
  public step = 1;
  public dataValue = 0;
  public label = 'Number';
  public errorMessage = 'Incorrect value';

  constructor() { }

  ngOnInit() {
    const [min, max, step = 1] = this.config.limits;
    this.min = Math.min(min, max);
    this.max = Math.max(min, max);
    this.step = step;

    const { label, default: def, errorMessage, getValue, validate } = this.config;
    if (typeof def === 'undefined') {
      this.dataValue = def;
    } else {
      const steps = (max - min) / step;
      this.dataValue = min + Math.round( steps / 2) * step;
    }
    if (typeof label !== 'undefined') {
      this.label = label;
    }
    if (typeof errorMessage !== 'undefined') {
      this.errorMessage = errorMessage;
    }
    if (typeof validate === 'function') {
      this.validate = <() => boolean>validate;
    }
    if (typeof getValue === 'function') {
      this.getValue = <() => number>getValue;
    }
  }

  public validate(): boolean { return true; }
  public getValue(): number { return +this.dataValue; }

  onChange(e: Event) {
    const value = this.getValue();
    console.log(`${typeof this.dataValue} "${this.dataValue}" / "${value}"`);
    this.value.emit(value);
    this.onChange(value);
  }
}
