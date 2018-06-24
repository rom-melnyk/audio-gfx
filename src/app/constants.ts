enum NodeTypes {
  AudioSourceNode = 'Audio Source Node',
  AnalyserNode = 'Analyser Node',
  GainNode = 'Gain Node',
  DelayNode = 'Delay Node',
  AudioDestinationNode = 'Audio Destination Node',
}

const Defaults = {
  [NodeTypes.DelayNode]: {
    MAX_DELAY: 10, // in seconds
  }
};

export { NodeTypes, Defaults };
