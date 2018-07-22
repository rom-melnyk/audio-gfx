import { AbstractNodeComplex, NodeTypes } from './abstract-node-complex';
import { IBooleanInput, INumberInput, IRadioInput } from '../components/form-elements/input-interfaces';

enum AnalyserModes {
  BARS = 'bars',
  WAVEFORM = 'waveform',
}

class AnalyserNodeComplex extends AbstractNodeComplex {
  static readonly DEFAULT_INTERVAL = 50;

  public configurables: {
    mode?: IRadioInput,
    colorize?: IBooleanInput,
    interval?: INumberInput,
    fftSize?: INumberInput,
    smoothingTimeConstant?: INumberInput,
    minDecibels?: INumberInput,
    maxDecibels?: INumberInput,
  } = {};

  constructor(
    private audioContext: AudioContext,
  ) {
    super(NodeTypes.AnalyserNode);
    const analyserNode = audioContext.createAnalyser();
    this.node = analyserNode;

    // onChange() handlers are set later
    this.configurables.mode = <IRadioInput>{
      type: 'radio',
      default: AnalyserModes.BARS,
      options: [ AnalyserModes.BARS, AnalyserModes.WAVEFORM ],
    };
    this.configurables.colorize = <IBooleanInput>{
      type: 'boolean',
      default: false,
      label: 'Colorize',
    };
    this.configurables.interval = <INumberInput>{
      type: 'number',
      limits: [25, 1000, 25],
      default: AnalyserNodeComplex.DEFAULT_INTERVAL,
      label: 'Interval, ms',
    };
    this.configurables.fftSize = <INumberInput>{
      type: 'number',
      limits: [5, 15, 1],
      default: 6,
      label: 'FFT size, 2<sup>n</sup>',
    };
    this.configurables.smoothingTimeConstant = <INumberInput>{
      type: 'number',
      limits: [0, 1, .01],
      default: .8,
      label: 'Smoothing time constant',
    };
    this.configurables.minDecibels = <INumberInput>{
      type: 'number',
      limits: [-200, 0, 10],
      default: -100,
      label: 'minDecibels',
      errorMessage: 'Cannot be greater then maxDecibel!'
    };
    this.configurables.maxDecibels = <INumberInput>{
      type: 'number',
      limits: [-200, 0, 10],
      default: -30,
      label: 'maxDecibels',
      errorMessage: 'Cannot be less then or equal to minDecibel!'
    };

    this.config = [
      this.configurables.mode,
      this.configurables.colorize,
      this.configurables.interval,
      this.configurables.fftSize,
      this.configurables.smoothingTimeConstant,
      this.configurables.minDecibels,
      this.configurables.maxDecibels,
    ];
  }
}

export { AnalyserNodeComplex, AnalyserModes };
