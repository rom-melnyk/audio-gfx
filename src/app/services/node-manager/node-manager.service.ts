import { Injectable } from '@angular/core';
import { Node } from '../../models/node-model';
import { NodeTypes } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class NodeManagerService {
  private nodes: Node[] = [];

  constructor() {
    this.addNodeAt(NodeTypes.AudioSourceNode);
    this.addNodeAt(NodeTypes.AudioDestinationNode);
  }

  addNodeAt(type: NodeTypes, position: number = -1): void {
    const node: Node = new Node(type);
    if (position < 0 || position > this.nodes.length) {
      position = this.nodes.length;
    }
    this.nodes.splice(position, 0, node);
    // TODO do audioContext business (chaining) here
  }


  removeNodeAt(position): void {
    if (position === 0 || position === this.nodes.length - 1) {
      console.warn('[ NodeManagerService ] Cannot remove first or last node!');
      return;
    }

    if (position < 1 || position > this.nodes.length - 2) {
      console.warn('[ NodeManagerService ] Bad index provided');
      return;
    }

    const [ node ] = this.nodes.splice(position, 1);
    // TODO do audioContext business (de-chaining) here
  }


  getNodes(): Node[] {
    return this.nodes;
  }
}
