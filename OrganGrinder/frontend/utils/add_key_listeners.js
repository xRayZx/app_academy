const KeyActions = require('../actions/key_actions');

const Mapping = {
  65: 'A2',
  83: 'B2',
  68: 'C3',
  70: 'D3',
  74: 'E3',
  75: 'F3',
  76: 'G3',
  186: 'A3'
};

const addKeyListeners = function () {
  $(document).on("keydown", function (event) {
    let key = event.keyCode;
    const note = Mapping[key];
    KeyActions.keyPressed(note);
  });

  $(document).on("keyup", function (event) {
    let key = event.keyCode;
    const note = Mapping[key];
    KeyActions.keyReleased(note);
  });
};

module.exports = addKeyListeners;
