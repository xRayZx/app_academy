const Dispatcher = require('../dispatcher/dispatcher');

const KeyActions = {
  keyPressed (note) {
    Dispatcher.dispatch({
      actionType: "PLAY_NOTE",
      noteName: note
    });
  },
  keyReleased (note) {
    const action = {
      actionType: "RELEASE_NOTE",
      noteName: note
    };
    Dispatcher.dispatch(action);
  }
};

module.exports = KeyActions;
