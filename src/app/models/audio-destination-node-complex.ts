import { NodeTypes } from '../constants';
import { AbstractNodeComplex } from './abstract-node-complex';

class AudioDestinationNodeComplex extends AbstractNodeComplex {
  constructor(
    public node: AudioDestinationNode
  ) {
    super(NodeTypes.AudioDestinationNode, node);
  }
}

export { AudioDestinationNodeComplex };
