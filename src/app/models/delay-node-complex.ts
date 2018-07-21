import { AbstractNodeComplex, NodeTypes } from './abstract-node-complex';
import { INumberInput } from '../components/form-elements/input-interfaces';

class DelayNodeComplex extends AbstractNodeComplex {
  static readonly MAX_DELAY = 10; // in seconds

  constructor(
    public node: DelayNode
  ) {
    super(NodeTypes.DelayNode, node);
    this.config = [
      <INumberInput>{
        type: 'number',
        limits: [0, DelayNodeComplex.MAX_DELAY, .1],
        default: 0,
        label: 'Delay, s',
        onChange(value) {
          node.delayTime.value = Number(value) || 0;
        }
      }
    ];
  }
}

export { DelayNodeComplex };
