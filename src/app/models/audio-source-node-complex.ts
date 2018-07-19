import { NodeTypes } from '../constants';
import { AbstractNodeComplex } from './abstract-node-complex';

class AudioSourceNodeComplex extends AbstractNodeComplex {
  constructor(
    public node: MediaElementAudioSourceNode
  ) {
    super(NodeTypes.AudioSourceNode, node);
  }
}

export { AudioSourceNodeComplex };
