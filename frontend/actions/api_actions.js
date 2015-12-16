var AlbumConstants = require('../constants/album_constants');
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

  receiveAlbums: function (albums) {
    AppDispatcher.dispatch({
      actionType: AlbumConstants.ALBUMS_RECEIVED,
      albums: albums
    });
  }
};

module.exports = ApiActions;
