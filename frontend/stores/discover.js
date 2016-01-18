var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _discover = false;
var _discoverHeight = 809;
var DiscoverStore = new Store(AppDispatcher);

var setDiscover = function (discover) {
  _discover = discover;
  DiscoverStore.__emitChange();
};

var setDiscoverHeight = function (height) {
  _discoverHeight = height;
  debugger;
  DiscoverStore.__emitChange();
};

DiscoverStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "SET_DISCOVER":
      setDiscover(payload.discover);
      break;
    case "SET_DISCOVER_HEIGHT":
      setDiscoverHeight(payload.height);
      break;
  }
};

DiscoverStore.discover = function () {
  return _discover;
};

DiscoverStore.discoverHeight = function () {
  return _discoverHeight;
};

module.exports = DiscoverStore
