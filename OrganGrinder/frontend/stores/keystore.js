const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');

let _keystore = [];

const KeyStore = window.KeyStore = new Store(Dispatcher);

KeyStore.all = function () {
  return _keystore.slice();
};

KeyStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "PLAY_NOTE":
      _keystore.push(payload.noteName);
      this.__emitChange();
      break;
    case "RELEASE_NOTE":
      let noteIdx = _keystore.indexOf(payload.noteName);
      _keystore.splice(noteIdx, 1);
      this.__emitChange();
      break;
  }
};

module.exports = KeyStore;
