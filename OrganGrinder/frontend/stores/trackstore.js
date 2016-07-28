const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');

const TrackStore = new Store(Dispatcher);

let _tracks = [];

TrackStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "SAVE_TRACK":
      _tracks.push(payload.track);
      this.__emitChange();
      break;
  }
};

TrackStore.all = function () {
  console.log(_tracks);
  return _tracks.slice();
};
