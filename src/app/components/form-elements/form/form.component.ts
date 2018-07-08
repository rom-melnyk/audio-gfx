import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <div class="form">
      <ng-container *ngFor="let field of fields">
        <ng-container *ngSwitch="field.config?.type">
          <app-input-number *ngSwitchCase="'number'" [config]="field.config" [onChange]="field.onChange"></app-input-number>
          <div class="error" *ngSwitchDefault="">Incorrect field config type "{{config?.type}}"</div>
        </ng-container>
      </ng-container>
    </div>
  `
})
export class FormComponent implements OnInit {
  @Input() fields: object[];

  constructor() { }

  ngOnInit() {
  }

}
