import { Injectable } from '@angular/core';
import { Node } from '../../models/node-model';
import { NodeTypes } from '../../constants';
import { AudioContextService } from '../audio-context/audio-context.service';

const MODULE_NAME = 'NodeManagerService';

@Injectable({
  providedIn: 'root'
})
export class NodeManagerService {
  private nodes: Node[] = [];

  constructor(
    private audioContext: AudioContextService
  ) {
    const audioDestinationNode = this.audioContext.createNode(NodeTypes.AudioDestinationNode);
    this.nodes.push(
      new Node(NodeTypes.AudioSourceNode),
      new Node(NodeTypes.AudioDestinationNode, audioDestinationNode),
    );
  }

  initNodesChain(audioElement: HTMLAudioElement) {
    // WORKAROUND: since <audio> element is created _after_ AudioSourceNode was created,
    // we have to update the AudioSourceNode afterwards.
    // After it's done we can proceed with nodes chain.
    this.nodes[0].node = this.audioContext.createNode(NodeTypes.AudioSourceNode, audioElement);
    this.nodes.forEach((node, i, nodes): void => {
      if (i === this.nodes.length - 1) {
        return;
      }
      node.node.connect(nodes[i + 1].node);
    });
  }

  addNodeAt(type: NodeTypes, position: number): void {
    if (position < 1 || position > this.nodes.length - 1) {
      console.error(`[ ${MODULE_NAME}::addNodeAt() ] Bad position ${position}`);
      return;
    }

    const previousNode = this.nodes[position - 1];
    const nextNode = this.nodes[position];
    const audioNode = this.audioContext.createNode(type);
    const newNode: Node = new Node(type, audioNode);

    previousNode.node.disconnect(nextNode.node);
    previousNode.node.connect(newNode.node);
    newNode.node.connect(nextNode.node);

    this.nodes.splice(position, 0, newNode);
  }


  removeNodeAt(position): void {
    if (position === 0 || position === this.nodes.length - 1) {
      console.error(`[ ${MODULE_NAME} ] Cannot remove first or last node`);
      return;
    }

    if (position < 1 || position > this.nodes.length - 2) {
      console.error(`[ ${MODULE_NAME} ] Bad position ${position}`);
      return;
    }

    const previousNode = this.nodes[position - 1];
    const nextNode = this.nodes[position + 1];
    const [ node ] = this.nodes.splice(position, 1);

    previousNode.node.disconnect(node.node);
    node.node.disconnect(nextNode.node);
    previousNode.node.connect(nextNode.node);
  }


  getNodes(): Node[] {
    return this.nodes;
  }
}
