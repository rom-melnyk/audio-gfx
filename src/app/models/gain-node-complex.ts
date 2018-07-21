import { AbstractNodeComplex, NodeTypes } from './abstract-node-complex';
import { INumberInput } from '../components/form-elements/input-interfaces';

class GainNodeComplex extends AbstractNodeComplex {
  constructor(
    public node: GainNode
  ) {
    super(NodeTypes.GainNode, node);
    this.config = [
      <INumberInput>{
        type: 'number',
        limits: [0, 1, .01],
        default: 1,
        label: 'Gain',
        onChange(value) {
          node.gain.value = Number(value) || 0;
        }
      }
    ];
  }
}

export { GainNodeComplex };
