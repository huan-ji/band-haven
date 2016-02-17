var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _discover = false;
var DiscoverStore = new Store(AppDispatcher);

var setDiscover = function (discover) {
  _discover = discover;
  DiscoverStore.__emitChange();
};

DiscoverStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "SET_NAVIGATE_DISCOVER":
      setDiscover(payload.discover);
      break;
  }
};

DiscoverStore.navigateDiscover = function () {
  return _discover;
};

module.exports = DiscoverStore
