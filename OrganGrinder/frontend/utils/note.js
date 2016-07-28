// util/note.js
const ctx = new (window.AudioContext || window.webkitAudioContext)();

const createOscillator = function (freq) {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

const createGainNode = function () {
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

const Note = function (freq) {
  this.oscillatorNode = createOscillator(freq);
  this.gainNode = createGainNode();
  this.oscillatorNode.connect(this.gainNode);
};

Note.prototype.start = function () {
    // can't explain 0.3, it is a reasonable value
    this.gainNode.gain.value = 0.3;
};

Note.prototype.stop = function () {
    this.gainNode.gain.value = 0;
};

module.exports = Note;
