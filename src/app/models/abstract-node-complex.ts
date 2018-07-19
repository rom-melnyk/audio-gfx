import { NodeTypes } from '../constants';
import { IInput } from '../components/form-elements/input-interfaces';

class AbstractNodeComplex {
  public isRemovable = true;
  public name: NodeTypes;

  constructor(
    public type: NodeTypes,
    public node: AudioNode = null,
    public config: IInput[] = []
  ) {
    if (type === NodeTypes.AudioSourceNode || type === NodeTypes.AudioDestinationNode) {
      this.isRemovable = false;
    }

    this.name = type; // for the matter of simplicity
  }
}

export { AbstractNodeComplex };
