import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <div class="form">
      <ng-container *ngFor="let field of fields; let i = index;">
        <ng-container [ngSwitch]="field.type">
          <app-input-number *ngSwitchCase="'number'" [config]="field" [isLast]="i === fields.length - 1"></app-input-number>
          <app-input-boolean *ngSwitchCase="'boolean'" [config]="field" [isLast]="i === fields.length - 1"></app-input-boolean>
          <app-input-radio *ngSwitchCase="'radio'" [config]="field" [isLast]="i === fields.length - 1"></app-input-radio>
          <div class="error" *ngSwitchDefault="">Incorrect field config type "{{field.type}}"</div>
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
