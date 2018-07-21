import { Component, OnInit, Input } from '@angular/core';
import { AbstractNodeComplex, NodeTypes } from '../../../models/abstract-node-complex';
import { NodeManagerService } from '../../../services/node-manager/node-manager.service';

@Component({
  selector: 'app-node-wrapper',
  templateUrl: './node-wrapper.component.html',
  styleUrls: ['./node-wrapper.component.scss']
})
export class NodeWrapperComponent implements OnInit {
  @Input() nodeComplex: AbstractNodeComplex;
  @Input() index: number;
  @Input() isLast = false;
  public NodeTypes = NodeTypes;

  constructor(private nodeManager: NodeManagerService) { }

  onRemoveNode() {
    if (window.confirm(`Sure to remove "${this.nodeComplex.name}"?`)) {
      this.nodeManager.removeNodeAt(this.index);
    }
  }

  ngOnInit() {
  }

}
