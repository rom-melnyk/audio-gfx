import { AbstractNodeComplex, NodeTypes } from './abstract-node-complex';

class AudioSourceNodeComplex extends AbstractNodeComplex {
  constructor(
    public node: MediaElementAudioSourceNode
  ) {
    super(NodeTypes.AudioSourceNode, node);
  }
}

export { AudioSourceNodeComplex };
