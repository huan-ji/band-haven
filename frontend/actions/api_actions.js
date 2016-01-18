var AlbumConstants = require('../constants/album_constants');
var AuthConstants = require('../constants/auth_constants');
var FilterConstants = require('../constants/filter_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveAuthMessages: function (messages) {
    AppDispatcher.dispatch({
      actionType: AuthConstants.MESSAGES_RECEIVED,
      messages: messages
    });
  },

  receiveAllAlbums: function (albums) {
    AppDispatcher.dispatch({
      actionType: AlbumConstants.ALL_ALBUMS_RECEIVED,
      albums: albums
    });
  },

  receiveAlbums: function (albums) {
    AppDispatcher.dispatch({
      actionType: AlbumConstants.ALBUMS_RECEIVED,
      albums: albums
    });
  },

  receiveShowAlbum: function (album) {
    AppDispatcher.dispatch({
      actionType: AlbumConstants.SHOW_ALBUM_RECEIVED,
      album: album
    });
  },

  receiveAlbum: function (album) {
    AppDispatcher.dispatch({
      actionType: AlbumConstants.ALBUM_RECEIVED,
      album: album
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

  selectAlbum: function (album) {
    AppDispatcher.dispatch({
      actionType: AlbumConstants.ALBUM_SELECTED,
      album: album
    });
  },

  selectSong: function (song) {
    // debugger;
    AppDispatcher.dispatch({
      actionType: AlbumConstants.SONG_SELECTED,
      song: song
    });
  },

  playSwitch: function (playing) {
    AppDispatcher.dispatch({
      actionType: AlbumConstants.PLAY_SWITCHED,
      playing: playing
    });
  },

  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: AuthConstants.RECEIVE_USER,
      user: user
    });
  },

  logOutUser: function () {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_USER,
    });
  },

  setDiscover: function (discover) {
    AppDispatcher.dispatch({
      actionType: "SET_DISCOVER",
      discover: discover
    })
  },

  setDiscoverHeight: function (height) {
    AppDispatcher.dispatch({
      actionType: "SET_DISCOVER_HEIGHT",
      height: height
    })
  }


};

module.exports = ApiActions;
