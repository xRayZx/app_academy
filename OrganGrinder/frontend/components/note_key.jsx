const React = require('react');
const Note = require('../utils/note');
const TONES = require('../constants/tones');
const KeyStore = require('../stores/keystore');
const KeyActions = require('../actions/key_actions');

const NoteKey = React.createClass({
  getInitialState() {
    return (
      {note: new Note(TONES[this.props.note]), playing: false}
    );
  },
  componentDidMount () {
    KeyStore.addListener(this._handleChange);
  },
  _handleChange() {
    if (KeyStore.all().indexOf(this.props.note) !== -1) {
      this.setState({playing: true});
      this.state.note.start();
    }
    else {
      this.setState({playing: false});
      this.state.note.stop();
    }
  },
  render () {
    let style = "keynote";
    if (this.state.playing) {
      style = "keynote pressed";
    }
    return (
      <div className={style}
           onMouseDown={KeyActions.keyPressed.bind(null, this.props.note)}
           onMouseUp={KeyActions.keyReleased.bind(null, this.props.note)}
           >{this.props.note}</div>
    );
  }
});

module.exports = NoteKey;
