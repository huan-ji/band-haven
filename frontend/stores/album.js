var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _albums = {};
var _featuredAlbum = null;
var _showAlbum = null;
var _selectedAlbum = null;
var _searchAlbums = null;
var _selectedSong = { song: "", playing: false};
var AlbumStore = new Store(AppDispatcher);
var AlbumConstants = require('../constants/album_constants');

var resetAlbums = function (albums) {

  _albums = {};
  albums.forEach(function (album) {
    _albums[album.id] = album;
  })
  // debugger;
  AlbumStore.__emitChange();
}

var featuredAlbum = function (album) {
  _featuredAlbum = album;
  AlbumStore.__emitChange();
}

var showAlbum = function (album) {
  _showAlbum = album;
  AlbumStore.__emitChange();
}

var selectAlbum = function (album) {
  _selectedAlbum = album;
  var song = album.songs[0];
  if (_selectedSong.song === song) {
    _selectedSong.playing = !_selectedSong.playing;
  } else {
    _selectedSong.song = song;
    _selectedSong.playing = true;
  }
  AlbumStore.__emitChange();
}

var selectSong = function (song) {
  if (_selectedAlbum === null && song.album_id === _featuredAlbum.id) {
    _selectedAlbum = _featuredAlbum;
  }

  if (_selectedSong.song === song) {
    _selectedSong.playing = !_selectedSong.playing;
  } else {
    _selectedSong.song = song;
    _selectedSong.playing = true;
  }
  AlbumStore.__emitChange();
}

var playSwitch = function (playing) {
  _selectedSong.playing = playing;
  AlbumStore.__emitChange();
}

var searchAlbums = function (albums) {
  _searchAlbums = albums;
  AlbumStore.__emitChange();
}

AlbumStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AlbumConstants.ALL_ALBUMS_RECEIVED:
      searchAlbums(payload.albums);
      break;
    case AlbumConstants.ALBUMS_RECEIVED:
      resetAlbums(payload.albums);
      break;
    case AlbumConstants.ALBUM_RECEIVED:
      featuredAlbum(payload.album);
      break;
    case AlbumConstants.SHOW_ALBUM_RECEIVED:
      showAlbum(payload.album);
      break;
    case AlbumConstants.ALBUM_SELECTED:
      selectAlbum(payload.album);
      break;
    case AlbumConstants.SONG_SELECTED:
      selectSong(payload.song);
      break;
    case AlbumConstants.PLAY_SWITCHED:
      playSwitch(payload.playing);
      break;
  }
};

AlbumStore.allSearch = function () {
  return _searchAlbums;
};

AlbumStore.all = function () {
  var returnAlbums = [];
  for (var id in _albums) {
    if (_albums.hasOwnProperty(id)) {
      returnAlbums.push(_albums[id]);
    }
  };
  return returnAlbums;
};

AlbumStore.featuredAlbum = function () {
  return _featuredAlbum;
}

AlbumStore.showAlbum = function () {
  return _showAlbum;
}

AlbumStore.selectedAlbum = function () {
  return _selectedAlbum;
}

AlbumStore.selectedSong = function () {
  return _selectedSong;
}


module.exports = AlbumStore
