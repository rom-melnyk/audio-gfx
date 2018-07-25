import { AbstractNodeComplex, NodeTypes } from './abstract-node-complex';
import { INumberInput, IRadioInput } from '../components/form-elements/input-interfaces';

class BiquadFilterNodeComplex extends AbstractNodeComplex {
  constructor(
    private audioContext: AudioContext,
  ) {
    super(NodeTypes.BiquadFilterNode);
    const biquadFilterNode = audioContext.createBiquadFilter();
    this.node = biquadFilterNode;
    this.config = [
      <IRadioInput>{
        type: 'radio',
        options: [
          'lowpass', 'highpass', 'bandpass',
          'lowshelf', 'highshelf',
          'peaking',
          'notch',
          'allpass'
        ],
        onChange(value) {
          biquadFilterNode.type = <BiquadFilterType>value;
        }
      },
      <INumberInput>{
        type: 'number',
        limits: [20, 18000, 10],
        default: 350,
        label: 'Frequency',
        onChange(value) {
          biquadFilterNode.frequency.value = Number(value) || 0;
        }
      },
      <INumberInput>{
        type: 'number',
        limits: [0, 100, 1],
        default: 100,
        label: 'Detune',
        onChange(value) {
          biquadFilterNode.detune.value = Number(value) || 0;
        }
      },
      <INumberInput>{
        type: 'number',
        limits: [-4, 3, .1],
        default: 0,
        label: 'Q, 10<sup>x</sup>',
        onChange(value) {
          const nValue = Number(value) || 0;
          biquadFilterNode.Q.value = Math.pow(10, nValue);
        }
      },
      <INumberInput>{
        type: 'number',
        limits: [-40, 40, 1],
        default: 0,
        label: 'QGain',
        onChange(value) {
          biquadFilterNode.gain.value = Number(value) || 0;
        }
      },
    ];
  }
}

export { BiquadFilterNodeComplex };
