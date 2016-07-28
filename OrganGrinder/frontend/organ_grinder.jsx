const React = require('react');
const ReactDOM = require('react-dom');

const addKeyListener = require('./utils/add_key_listeners');
const KeyStore = require('./stores/keystore');
const NoteKey = require('./components/note_key');
const TONES = require('./constants/tones');
const Recorder = require('./components/recorder');

const Organ = React.createClass({
  componentDidMount () {
    addKeyListener();
  },
  render() {
    let allNotes = Object.keys(TONES).map( (key) => {
      return (
        <NoteKey note={key} key={key}/>
      );
    });
    return(
      <figure>
        <div className="clearfix">{allNotes}</div>
        <Recorder />
      </figure>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Organ />, document.getElementById('content'));
});
