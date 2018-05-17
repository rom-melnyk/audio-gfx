/**
 * @param {AudioBuffer} audioBuffer
 * @constructor
 */
function Stat (audioBuffer) {
    this.duration = audioBuffer.duration;
    this.length = audioBuffer.length;
    this.numberOfChannels = audioBuffer.numberOfChannels;
    this.sampleRate = audioBuffer.sampleRate;
}

export default Stat;
