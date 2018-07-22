import { AbstractNodeComplex, NodeTypes } from './abstract-node-complex';
import { INumberInput } from '../components/form-elements/input-interfaces';

class GainNodeComplex extends AbstractNodeComplex {
  constructor(
    private audioContext: AudioContext,
  ) {
    super(NodeTypes.GainNode);
    const gainNode = audioContext.createGain();
    this.node = gainNode;
    this.config = [
      <INumberInput>{
        type: 'number',
        limits: [0, 1, .01],
        default: 1,
        label: 'Gain',
        onChange(value) {
          gainNode.gain.value = Number(value) || 0;
        }
      }
    ];
  }
}

export { GainNodeComplex };
