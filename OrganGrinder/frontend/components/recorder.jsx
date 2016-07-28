const React = require('react');
const Track = require('../utils/track');
const KeyStore = require('../stores/keystore');
const Dispatcher = require('../dispatcher/dispatcher');

const Recorder = React.createClass({
  getInitialState () {
    return (
      {recording: false, track: new Track()}
    );
  },
  componentDidMount () {
    KeyStore.addListener(this._recordKeys);
  },
  _recordKeys () {
    if (this.state.recording) {
      this.state.track.addNotes(KeyStore.all());
    }
  },
  toggleRecord () {
    if (this.state.recording) {
      this.state.track.stopRecording();
    } else {
      this.state.track.startRecording();
    }
    this.setState({recording: !(this.state.recording)});
  },
  togglePlay() {
    this.state.track.play();
  },
  saveTrack () {
    Dispatcher.dispatch({
      actionType: "SAVE_TRACK",
      track: this.state.track
    });
  },
  render () {
    let recButton = "Start Recording";
    if (this.state.recording) {
      recButton = "Stop Recording";
    }
    return (
      <controls>
        <button onClick={this.togglePlay}>Play</button>
        <button onClick={this.toggleRecord}>{recButton}</button>
        <button onClick={this.saveTrack}>Save Track</button>
      </controls>
    );
  }
});

module.exports = Recorder;
