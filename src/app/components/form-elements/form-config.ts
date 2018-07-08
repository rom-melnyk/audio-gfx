import { NodeTypes } from '../../constants';


interface IInput {
  type: 'number' | 'string' | 'boolean' | 'radio';
  label: string;
  default?: number | string | boolean;
  errorMessage?: string;
  getValue?(this: IInput): () => (number | string | boolean);
  validate?(this: IInput): () => boolean;
}


interface INumberInput extends IInput {
  type: 'number';
  limits: [ number, number ] | [ number, number, number ];
  default?: number;
  getValue?(this: INumberInput): () => number;
  validate?(this: INumberInput): () => boolean;
}


interface IStringInput extends IInput {
  type: 'string';
  default?: string;
  getValue?(this: IStringInput): () => string;
  validate?(this: IStringInput): () => boolean;
}


interface IBooleanInput extends IInput {
  type: 'boolean';
  default?: boolean;
  getValue?(this: IBooleanInput): () => boolean;
  validate?(this: IBooleanInput): () => boolean;
}


interface IRadioInput extends IInput {
  type: 'radio';
  default?: string;
  values: string[];
  getValue?(this: IRadioInput): () => string;
  validate?(this: IRadioInput): () => boolean;
}


// const Config = {
//   [NodeTypes.AnalyserNode]: {},
//   [NodeTypes.DelayNode]: {},
//   [NodeTypes.GainNode]: {},
// };

export {
  INumberInput, IBooleanInput, IRadioInput, IStringInput
};
