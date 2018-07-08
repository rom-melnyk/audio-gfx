import { Component, Input, OnInit } from '@angular/core';
import { InputAbstract } from '../input-abstract';
import { IBooleanInput } from '../input-interfaces';

@Component({
  selector: 'app-input-boolean',
  template: `
    <div class="form-section" [class.invalid]="!validate(value)" [class.is-last]="isLast">
      <div class="label" [innerHTML]="label"></div>
      <div class="input-wrapper">
        <input type="checkbox" (change)="onChange(value)" [(ngModel)]="value">
        <span class="error-message" [innerHTML]="errorMessage"></span>
      </div>
    </div>
  `,
  styles: [
    '.form-section.invalid .error-message { display: inline; }'
  ]
})
export class InputBooleanComponent extends InputAbstract implements OnInit {
  @Input() config: IBooleanInput;
  public value = false;

  constructor() {
    super();
  }

  ngOnInit() {
    if (typeof this.config.default !== 'undefined') {
      this.value = this.config.default;
    }

    super.ngOnInit();
  }
}
