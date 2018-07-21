import { Injectable } from '@angular/core';
import { AudioContextService } from '../audio-context/audio-context.service';
import { AbstractNodeComplex, NodeTypes } from '../../models/abstract-node-complex';
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
  private nodeComplexes: AbstractNodeComplex[] = [];

  constructor(
    private audioContext: AudioContextService
  ) {
    this.nodeComplexes.push(
      new AbstractNodeComplex(NodeTypes.AudioSourceNode, null), // dummy one; will be updated during init phase
      this.createNodeComplex(NodeTypes.AudioDestinationNode),
    );
  }

  initNodesChain(audioElement: HTMLAudioElement) {
    if (this.nodeComplexes[0].node) { // already initialized?
      return;
    }

    // WORKAROUND: since <audio> element is created _after_ AudioSourceNode was created,
    // we have to update the AudioSourceNode afterwards.
    // After it's done we can proceed with nodeComplexes chain.
    this.nodeComplexes[0] = this.createNodeComplex(NodeTypes.AudioSourceNode, audioElement);
    this.nodeComplexes.forEach((nodeComplex, i, nodeComplexes): void => {
      if (i === this.nodeComplexes.length - 1) {
        return;
      }
      nodeComplex.node.connect(nodeComplexes[i + 1].node);
    });
  }

  addNodeAt(type: NodeTypes, position: number): void {
    if (position < 1 || position > this.nodeComplexes.length - 1) {
      console.error(`[ ${MODULE_NAME}::addNodeAt() ] Bad position ${position}`);
      return;
    }

    const previousNodeComplex = this.nodeComplexes[position - 1];
    const nextNodeComplex = this.nodeComplexes[position];
    const newNodeComplex = this.createNodeComplex(type);

    previousNodeComplex.node.disconnect(nextNodeComplex.node);
    previousNodeComplex.node.connect(newNodeComplex.node);
    newNodeComplex.node.connect(nextNodeComplex.node);

    this.nodeComplexes.splice(position, 0, newNodeComplex);
  }


  removeNodeAt(position): void {
    if (position === 0 || position === this.nodeComplexes.length - 1) {
      console.error(`[ ${MODULE_NAME} ] Cannot remove first or last node`);
      return;
    }

    if (position < 1 || position > this.nodeComplexes.length - 2) {
      console.error(`[ ${MODULE_NAME} ] Bad position ${position}`);
      return;
    }

    const previousNodeComplex = this.nodeComplexes[position - 1];
    const nextNodeComplex = this.nodeComplexes[position + 1];
    const [ nodeComplex ] = this.nodeComplexes.splice(position, 1);

    previousNodeComplex.node.disconnect(nodeComplex.node);
    nodeComplex.node.disconnect(nextNodeComplex.node);
    previousNodeComplex.node.connect(nextNodeComplex.node);
  }


  getNodeComplexes(): AbstractNodeComplex[] {
    return this.nodeComplexes;
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
