import { Component, Input, OnInit } from '@angular/core';
import { InputAbstract } from '../input-abstract';
import { IRadioInput } from '../input-interfaces';

interface IOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-input-radio',
  template: `
    <div class="form-section" [class.invalid]="!validate(value)" [class.is-last]="isLast">
      <div class="label" [innerHTML]="label"></div>
      <div class="input-wrapper">
        <span class="option-wrapper" *ngFor="let option of options">
          <input type="radio" (change)="onChange(value)" [(ngModel)]="value" value="{{option.name}}">
          <label [innerHTML]="option.name"></label>
        </span>
        <div class="error-message" [innerHTML]="errorMessage"></div>
      </div>
    </div>
  `,
  styles: [
    `.form-section .option-wrapper {
          display: inline-block;
          width: 33.33%;
          overflow: hidden;
          text-overflow: ellipsis;
      }`
  ]
})
export class InputRadioComponent extends InputAbstract implements OnInit {
  @Input() config: IRadioInput;
  public value: string;
  public options: IOption[];

  constructor() {
    super();
  }

  ngOnInit() {
    const { options, default: def } = this.config;
    if (options.length === 0) {
      throw new TypeError('RadioInput expects one or more options');
    }

    this.options = (<Array<IOption|string>>options).map((option: IOption | string): IOption => {
      return typeof option === 'string'
        ? { name: <string>option, value: <string>option }
        : <IOption>option;
    });
    if (typeof def !== 'undefined' && this.options.find(({ value }) => def === value)) {
      this.value = def;
    } else {
      this.value = this.options[0].value;
    }

    super.ngOnInit();
  }
}
