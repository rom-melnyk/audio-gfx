import { AbstractNodeComplex, NodeTypes } from './abstract-node-complex';
import { IBooleanInput, INumberInput, IRadioInput } from '../components/form-elements/input-interfaces';

enum AnalyserModes {
  BARS = 'bars',
  WAVEFORM = 'waveform',
}

class AnalyserNodeComplex extends AbstractNodeComplex {
  static readonly DEFAULT_INTERVAL = 50;

  constructor(
    public node: AnalyserNode
  ) {
    super(NodeTypes.AnalyserNode, node);
    this.config = [
      <IRadioInput>{
        type: 'radio',
        default: AnalyserModes.BARS,
        options: [ AnalyserModes.BARS, AnalyserModes.WAVEFORM ],
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
        default: AnalyserNodeComplex.DEFAULT_INTERVAL,
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
          node.fftSize = Math.pow(2, <number>value);
        }
      },
    ];
  }
}

export { AnalyserNodeComplex, AnalyserModes };
