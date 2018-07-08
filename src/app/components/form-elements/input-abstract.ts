import { IInput } from './input-interfaces';
import { Input, OnInit } from '@angular/core';

export class InputAbstract implements OnInit {
  @Input() config: IInput;
  @Input() isLast: false;
  public value: number | string | boolean;
  public label = 'Label';
  public errorMessage = 'Incorrect value';

  constructor() { }

  ngOnInit() {
    const { label, errorMessage, validate, onChange } = this.config;
    if (typeof label !== 'undefined') {
      this.label = label;
    }
    if (typeof errorMessage !== 'undefined') {
      this.errorMessage = errorMessage;
    }
    if (typeof validate !== 'undefined') {
      this.validate = validate.bind(this);
    }
    if (typeof validate !== 'undefined') {
      this.validate = validate;
    }
    if (typeof onChange !== 'undefined') {
      this.onChange = onChange;
    }

    this.onChange(this.value);
  }

  public validate(value: number | string | boolean): boolean {
    return true;
  }

  public onChange(value: number | string | boolean): void {
    // should be implemented in sub-class
  }
}
