import { NodeTypes } from '../constants';
import { INumberInput } from '../components/form-elements/input-interfaces';
import { AbstractNodeComplex } from './abstract-node-complex';

class GainNodeComplex extends AbstractNodeComplex {
  constructor(
    public node: GainNode
  ) {
    super(
      NodeTypes.GainNode,
      node,
      [ <INumberInput>{
        type: 'number',
        limits: [0, 1, .01],
        default: 1,
        label: 'Gain',
        onChange(value) {
          this.node.gain.value = value;
        }
      }]
    );
  }
}

export { GainNodeComplex };
