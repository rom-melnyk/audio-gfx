enum NodeTypes {
  AudioSourceNode = 'Audio Source Node',
  AnalyserNode = 'Analyser Node',
  GainNode = 'Gain Node',
  DelayNode = 'Delay Node',
  AudioDestinationNode = 'Audio Destination Node',
}


enum AnalyserModes {
  BARS = 'bars',
  WAVEFORM = 'waveform',
}


const Defaults = {
  [NodeTypes.AnalyserNode]: {
    DEFAULT_MODE: AnalyserModes.BARS,
    DEFAULT_INTERVAL: 25, // in milliseconds
  },
  [NodeTypes.DelayNode]: {
    MAX_DELAY: 10, // in seconds
  },
};


export { NodeTypes, AnalyserModes, Defaults };
