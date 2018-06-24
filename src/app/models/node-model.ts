import { NodeTypes } from '../constants';

class Node {
  public isRemovable = true;
  public name: NodeTypes;

  constructor(public type: NodeTypes, public node: AudioNode = null) {
    if (type === NodeTypes.AudioSourceNode || type === NodeTypes.AudioDestinationNode) {
      this.isRemovable = false;
    }

    this.name = type; // for the matter of simplicity
  }
}

export { Node };
