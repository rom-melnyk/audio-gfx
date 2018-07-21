interface IInput {
  type: 'number' | 'string' | 'boolean' | 'radio';
  label: string;
  default?: number | string | boolean;
  errorMessage?: string;
  validate?: (value: number | string | boolean, param?: any) => boolean;
  onChange?: (value: number | string | boolean) => void;
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
  options: string[] | { name: string, value: string }[];
}


export {
  IInput, INumberInput, IBooleanInput, IRadioInput, IStringInput
};
