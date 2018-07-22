import { AbstractNodeComplex, NodeTypes } from './abstract-node-complex';

class AudioDestinationNodeComplex extends AbstractNodeComplex {
  constructor(
    private audioContext: AudioContext
  ) {
    super(NodeTypes.AudioDestinationNode);
    this.node = audioContext.destination;
  }
}

export { AudioDestinationNodeComplex };
