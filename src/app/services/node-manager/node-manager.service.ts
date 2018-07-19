import { Injectable } from '@angular/core';
import { NodeTypes } from '../../constants';
import { AudioContextService } from '../audio-context/audio-context.service';
import { AbstractNodeComplex } from '../../models/abstract-node-complex';
import { AudioSourceNodeComplex } from '../../models/audio-source-node-complex';
import { AnalyserNodeComplex } from '../../models/analyser-node-complex';
import { DelayNodeComplex } from '../../models/delay-node-complex';
import { GainNodeComplex } from '../../models/gain-node-complex';
import { AudioDestinationNodeComplex } from '../../models/audio-destination-node-complex';

const MODULE_NAME = 'NodeManagerService';

@Injectable({
  providedIn: 'root'
})
export class NodeManagerService {
  private nodes: AbstractNodeComplex[] = [];

  constructor(
    private audioContext: AudioContextService
  ) {
    this.nodes.push(
      new AbstractNodeComplex(NodeTypes.AudioSourceNode, null), // dummy one; will be updated during init phase
      this.createNodeComplex(NodeTypes.AudioDestinationNode),
    );
  }

  initNodesChain(audioElement: HTMLAudioElement) {
    if (this.nodes[0].node) { // already initialized?
      return;
    }

    // WORKAROUND: since <audio> element is created _after_ AudioSourceNode was created,
    // we have to update the AudioSourceNode afterwards.
    // After it's done we can proceed with nodes chain.
    this.nodes[0] = this.createNodeComplex(NodeTypes.AudioSourceNode, audioElement);
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
    const newNode = this.createNodeComplex(type);

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


  getNodes(): AbstractNodeComplex[] {
    return this.nodes;
  }


  private createNodeComplex(type: NodeTypes, param: any = null): AbstractNodeComplex {
    const audioContext = this.audioContext.getContext();
    switch (type) {
      case NodeTypes.AudioSourceNode:
        const audioSourceNode = audioContext.createMediaElementSource(<HTMLAudioElement>param);
        return new AudioSourceNodeComplex(audioSourceNode);
      case NodeTypes.AnalyserNode:
        const analyserNode = audioContext.createAnalyser();
        return new AnalyserNodeComplex(analyserNode);
      case NodeTypes.GainNode:
        const gainNode = audioContext.createGain();
        return new GainNodeComplex(gainNode);
      case NodeTypes.DelayNode:
        const delayNode = audioContext.createDelay(DelayNodeComplex.MAX_DELAY);
        return new DelayNodeComplex(delayNode);
      case NodeTypes.AudioDestinationNode:
        return new AudioDestinationNodeComplex(audioContext.destination);
      default:
    }
    console.error(`[ ${MODULE_NAME}::createNode() ] Bad node type "${type}"`);
    return null;
  }

}
