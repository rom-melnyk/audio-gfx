import { Component, OnInit } from '@angular/core';
import { AbstractNodeComplex } from '../../models/abstract-node-complex';
import { NodeManagerService } from '../../services/node-manager/node-manager.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="main-content">
      <app-node-wrapper
          *ngFor="let nodeComplex of nodeComplexes; let i = index;"
          [nodeComplex]="nodeComplex"
          [isLast]="i === nodeComplexes.length - 1"
          [index]="i"
      ></app-node-wrapper>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public nodeComplexes: AbstractNodeComplex[];

  constructor(private nodeManager: NodeManagerService) {}

  ngOnInit() {
    this.nodeComplexes = this.nodeManager.getNodeComplexes();
  }
}
