import { Component, OnInit, Input } from '@angular/core';
import { NodeTypes } from '../../../constants';
import { Node } from '../../../models/node-model';

@Component({
  selector: 'app-node-general',
  templateUrl: './node-general.component.html',
  styleUrls: ['./node-general.component.scss']
})
export class NodeGeneralComponent implements OnInit {
  @Input() node: Node;
  @Input() isLast = false;
  public NodeTypes = NodeTypes;

  constructor() { }

  ngOnInit() {
  }

}
