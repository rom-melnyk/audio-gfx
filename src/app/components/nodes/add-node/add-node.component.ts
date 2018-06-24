import { Component, OnInit, Input } from '@angular/core';
import { NodeTypes } from '../../../constants';
import { NodeManagerService } from '../../../services/node-manager/node-manager.service';

class AvailableNode {
  public name: string;

  constructor(public type: NodeTypes) {
    this.name = NodeTypes[type];
  }
}

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss']
})
export class AddNodeComponent implements OnInit {
  public availableNodes: AvailableNode[] = [];
  @Input() index: number;

  constructor(private nodeManager: NodeManagerService) {
    this.availableNodes = <AvailableNode[]>Object.keys(NodeTypes)
      .sort()
      .map((type: NodeTypes) => new AvailableNode(type))
      .filter(({ name }) => (name !== NodeTypes.AudioSourceNode && name !== NodeTypes.AudioDestinationNode));
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
