import { AbstractNodeComplex, NodeTypes } from './abstract-node-complex';

class AudioSourceNodeComplex extends AbstractNodeComplex {
  constructor(
    private audioContext: AudioContext,
  ) {
    super(NodeTypes.AudioSourceNode);
  }

  public createNodeFromAudioElement(audioElement: HTMLAudioElement) {
    this.node = this.audioContext.createMediaElementSource(audioElement);
  }
}

export { AudioSourceNodeComplex };
