import { NodeTypes } from '../constants';
import { AbstractNodeComplex } from './abstract-node-complex';
import { IBooleanInput, INumberInput, IRadioInput } from '../components/form-elements/input-interfaces';

class AnalyserNodeComplex extends AbstractNodeComplex {
  constructor(
    public node: AnalyserNode
  ) {
    super(
      NodeTypes.AnalyserNode,
      node,
      [
        <IRadioInput>{
          type: 'radio',
          default: 'bars',
          options: [ 'bars', 'waveform' ],
          onChange(value) {
            console.log(`Mode is ${value}`);
          }
        },
        <IBooleanInput>{
          type: 'boolean',
          default: false,
          label: 'Colorize',
          onChange(value) {
            console.log(`Colorize is ${value ? 'on' : 'off'}`);
          }
        },
        <INumberInput>{
          type: 'number',
          limits: [25, 1000, 25],
          default: 50,
          label: 'Interval, ms',
          onChange(value) {
            console.log(`Interval = ${value}ms`);
          }
        },
        <INumberInput>{
          type: 'number',
          limits: [5, 15, 1],
          default: 6,
          label: 'FFT size, 2<sup>n</sup>',
          onChange(value) {
            this.node.fftSize = Math.pow(2, <number>value);
          }
        },
      ]
    );
  }
}

export { AnalyserNodeComplex };
