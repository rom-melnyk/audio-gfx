import { NodeTypes } from '../constants';
import { INumberInput } from '../components/form-elements/input-interfaces';
import { AbstractNodeComplex } from './abstract-node-complex';

class DelayNodeComplex extends AbstractNodeComplex {
  static readonly MAX_DELAY = 10; // in seconds

  constructor(
    public node: DelayNode
  ) {
    super(
      NodeTypes.DelayNode,
      node,
      [
        <INumberInput>{
          type: 'number',
          limits: [0, DelayNodeComplex.MAX_DELAY, .1],
          default: 0,
          label: 'Delay, s',
          onChange(value) {
            this.node.delayTime.value = value;
          }
        }
      ]
    );
  }
}

export { DelayNodeComplex };
