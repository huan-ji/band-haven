var AlbumConstants = require('../constants/album_constants');
var AuthConstants = require('../constants/auth_constants');
var FilterConstants = require('../constants/filter_constants');
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
  },

  receiveGenres: function (genres) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.GENRES_RECEIVED,
      genres: genres
    });
  },

  receiveSubGenres: function (subGenres) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.SUBGENRES_RECEIVED,
      subGenres: subGenres
    });
  },

  receiveLocations: function (locations) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.LOCATIONS_RECEIVED,
      locations: locations
    });
  },
};

module.exports = ApiActions;
