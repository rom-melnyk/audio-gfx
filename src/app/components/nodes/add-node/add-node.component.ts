import { Component, OnInit, Input } from '@angular/core';
import { NodeTypes } from '../../../constants';
import { NodeManagerService } from '../../../services/node-manager/node-manager.service';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss']
})
export class AddNodeComponent implements OnInit {
  private excludedNodes: NodeTypes[] = [ NodeTypes.AudioSourceNode, NodeTypes.AudioDestinationNode ];
  public availableNodes: NodeTypes[] = [];
  @Input() index: number;

  constructor(private nodeManager: NodeManagerService) {
    this.availableNodes = <NodeTypes[]>Object.keys(NodeTypes)
      .sort()
      .map((type: NodeTypes) => NodeTypes[type])
      .filter((type: NodeTypes) => !this.excludedNodes.includes(type));
  }

  onSelect(e: Event) {
    const target = <HTMLSelectElement>e.target;
    const value = target.value;
    if (!value) {
      return;
    }

    this.nodeManager.addNodeAt(<NodeTypes>value, this.index + 1);
    target.value = '';
  }

  ngOnInit() {
  }

}
