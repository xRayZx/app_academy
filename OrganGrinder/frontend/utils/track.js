const KeyActions = require('../actions/key_actions');

const Track = function () {
  // this.name = attr.name;
  this.roll = [];
  this.currTime = undefined;
};

Track.prototype.startRecording = function () {
  this.roll = [];
  this.currTime = new Date();
};

Track.prototype.addNotes = function (notes) {
  let elapsed = Date.now() - this.currTime;
    this.roll.push(
      {timeSlice: elapsed,
        notes: notes}
      );
  };

Track.prototype.stopRecording = function () {
  this.addNotes([]);
};

Track.prototype.play = function () {
  if (this.interval) {
    return;
  } else {
    let playbackStartTime = Date.now();
    let currentNote = 0;
    let currentNoteName;
    this.interval = setInterval(function () {
      if (currentNote < this.roll.length) {
        if (Date.now() - playbackStartTime > this.roll[currentNote].timeSlice) {
          let noteplay = this.roll[currentNote].notes[0];
          if (noteplay) {
            currentNoteName = noteplay;
            KeyActions.keyPressed(noteplay);
          } else {
            KeyActions.keyReleased(currentNoteName);
          }
          console.log(currentNote);
          currentNote++;
        }
      } else {
        clearInterval(this.interval);
        delete this.interval;
        KeyActions.keyReleased(currentNoteName);
      }
    }.bind(this), 10);
  }
};

module.exports = Track;
