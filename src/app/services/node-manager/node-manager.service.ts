import { Injectable } from '@angular/core';
import { AudioContextService } from '../audio-context/audio-context.service';
import { AbstractNodeComplex, NodeTypes } from '../../models/abstract-node-complex';
import { AudioSourceNodeComplex } from '../../models/audio-source-node-complex';
import { AnalyserNodeComplex } from '../../models/analyser-node-complex';
import { DelayNodeComplex } from '../../models/delay-node-complex';
import { GainNodeComplex } from '../../models/gain-node-complex';
import { BiquadFilterNodeComplex } from '../../models/biquad-filter-node-complex';
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
      this.createNodeComplex(NodeTypes.AudioSourceNode),
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
    (<AudioSourceNodeComplex>this.nodeComplexes[0]).createNodeFromAudioElement(audioElement);
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


  private createNodeComplex(type: NodeTypes): AbstractNodeComplex {
    const audioContext = this.audioContext.getContext();
    switch (type) {
      case NodeTypes.AudioSourceNode:
        return new AudioSourceNodeComplex(audioContext);
      case NodeTypes.AnalyserNode:
        return new AnalyserNodeComplex(audioContext);
      case NodeTypes.GainNode:
        return new GainNodeComplex(audioContext);
      case NodeTypes.DelayNode:
        return new DelayNodeComplex(audioContext);
      case NodeTypes.BiquadFilterNode:
        return new BiquadFilterNodeComplex(audioContext);
      case NodeTypes.AudioDestinationNode:
        return new AudioDestinationNodeComplex(audioContext);
      default:
    }
    console.error(`[ ${MODULE_NAME}::createNode() ] Bad node type "${type}"`);
    return null;
  }

}
