import { NodeTypes } from '../../constants';


interface IInput {
  type: 'number' | 'string' | 'boolean' | 'radio';
  label: string;
  default?: number | string | boolean;
  errorMessage?: string;
  validate?: () => boolean;
}


interface INumberInput extends IInput {
  type: 'number';
  limits: [ number, number ] | [ number, number, number ];
  default?: number;
}


interface IStringInput extends IInput {
  type: 'string';
  default?: string;
}


interface IBooleanInput extends IInput {
  type: 'boolean';
  default?: boolean;
}


interface IRadioInput extends IInput {
  type: 'radio';
  default?: string;
  values: string[];
}


// const Config = {
//   [NodeTypes.AnalyserNode]: {},
//   [NodeTypes.DelayNode]: {},
//   [NodeTypes.GainNode]: {},
// };

export {
  IInput, INumberInput, IBooleanInput, IRadioInput, IStringInput
};
