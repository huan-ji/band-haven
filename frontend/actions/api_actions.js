var AuthConstants = require('../constants/auth_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveAuthMessages: function (messages) {
    // debugger;
    AppDispatcher.dispatch({
      actionType: AuthConstants.MESSAGES_RECEIVED,
      messages: messages
    });
  },
};

module.exports = ApiActions;
