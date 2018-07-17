import { Component, Input, OnInit } from '@angular/core';
import { InputAbstract } from '../input-abstract';
import { IRadioInput } from '../input-interfaces';
import { getId } from '../form-utils';

interface IOption {
  id?: string;
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
          <input type="radio" id="{{option.id}}" value="{{option.name}}" (change)="onChange(value)" [(ngModel)]="value">
          <label for="{{option.id}}" [innerHTML]="option.name"></label>
        </span>
        <div class="error-message" [innerHTML]="errorMessage"></div>
      </div>
    </div>
  `,
  styles: [
    `.form-section .option-wrapper {
          display: inline-block;
          width: 33.33%;
          padding-right: .5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
        ? { id: getId(option), name: <string>option, value: <string>option }
        : { ...(<IOption>option), id: getId(option.value) };
    });
    if (typeof def !== 'undefined' && this.options.find(({ value }) => def === value)) {
      this.value = def;
    } else {
      this.value = this.options[0].value;
    }

    super.ngOnInit();
  }
}
