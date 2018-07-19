import { Component, OnInit } from '@angular/core';
import { AbstractNodeComplex } from '../../models/abstract-node-complex';
import { NodeManagerService } from '../../services/node-manager/node-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public nodes: AbstractNodeComplex[];

  constructor(private nodeManager: NodeManagerService) {}

  ngOnInit() {
    this.nodes = this.nodeManager.getNodes();
  }
}
