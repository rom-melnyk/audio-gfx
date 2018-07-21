import { AbstractNodeComplex, NodeTypes } from './abstract-node-complex';

class AudioDestinationNodeComplex extends AbstractNodeComplex {
  constructor(
    public node: AudioDestinationNode
  ) {
    super(NodeTypes.AudioDestinationNode, node);
  }
}

export { AudioDestinationNodeComplex };
