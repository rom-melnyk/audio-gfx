import { Component, OnInit } from '@angular/core';
import { Node } from '../../models/node-model';
import { NodeManagerService } from '../../services/node-manager/node-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public nodes: Node[];

  constructor(private nodeManager: NodeManagerService) {}

  ngOnInit() {
    this.nodes = this.nodeManager.getNodes();
  }
}
