var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _messages = [];
var AuthStore = new Store(AppDispatcher);
var AuthConstants = require('../constants/auth_constants');

var resetMessages = function (messages) {
  _messages = messages;
  AuthStore.__emitChange();
}

AuthStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AuthConstants.MESSAGES_RECEIVED:
      // debugger;
      resetMessages(payload.messages);
      break;
    case BenchConstants.REMOVE_BENCHES:
      removeBenches();
      break;
    case BenchConstants.BENCH_RECEIVED:
      receiveBench(payload.bench);
      break;
  }
};

AuthStore.all = function () {
  return _messages.slice(0);
};


module.exports = AuthStore
