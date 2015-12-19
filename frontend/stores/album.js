var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _albums = {};
var _selectedAlbum = null;
var AlbumStore = new Store(AppDispatcher);
var AlbumConstants = require('../constants/album_constants');

var resetAlbums = function (albums) {
  _albums = {};
  albums.forEach(function (album) {
    _albums[album.id] = album;
  })
  AlbumStore.__emitChange();
}

var selectAlbum = function (album) {
  _selectedAlbum = album;
  AlbumStore.__emitChange();
}

AlbumStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AlbumConstants.ALBUMS_RECEIVED:
      resetAlbums(payload.albums);
      break;
    case AlbumConstants.ALBUM_RECEIVED:
      receiveAlbum(payload.album);
      break;
    case AlbumConstants.ALBUM_SELECTED:
      selectAlbum(payload.album);
      break;
  }
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

AlbumStore.selectedAlbum = function () {
  return _selectedAlbum;
}


module.exports = AlbumStore
