var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _messages = [];
var _user = null;
var AuthStore = new Store(AppDispatcher);
var AuthConstants = require('../constants/auth_constants');

var resetMessages = function (messages) {
  _messages = messages;
  AuthStore.__emitChange();
};

var receiveUser = function (user) {
  _user = user;
  AuthStore.__emitChange();
};

var removeUser = function (user) {
  _user = null;
  AuthStore.__emitChange();
}


AuthStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AuthConstants.MESSAGES_RECEIVED:
      // debugger;
      resetMessages(payload.messages);
      break;
    case AuthConstants.RECEIVE_USER:
      receiveUser(payload.user);
      break;
    case AuthConstants.LOGOUT_USER:
      removeUser(payload.user);
      break;
  }
};

AuthStore.all = function () {
  return _messages.slice(0);
};

AuthStore.user = function () {
  return _user;
}


module.exports = AuthStore
