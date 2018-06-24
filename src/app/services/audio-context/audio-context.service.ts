import { Injectable } from '@angular/core';
import { NodeTypes } from '../../constants';

const MODULE_NAME = 'AudioContextService';

@Injectable({
  providedIn: 'root'
})
export class AudioContextService {
  private context: AudioContext;

  constructor() {
    const AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
    try {
      this.context = new AudioContext();
    } catch (e) {
      console.error(`[ ${MODULE_NAME} ] Failed creating audio context`, e);
    }
  }

  createNode(type: NodeTypes, param: any = null) {
    switch (type) {
      case NodeTypes.AudioSourceNode: return this.context.createMediaElementSource(<HTMLAudioElement>param);
      case NodeTypes.AnalyserNode: return this.context.createAnalyser();
      case NodeTypes.GainNode: return this.context.createGain();
      case NodeTypes.AudioDestinationNode: return this.context.destination;
      default:
    }
    console.error(`[ ${MODULE_NAME}::createNode() ] Bad node type "${type}"`);
    return null;
  }
}
