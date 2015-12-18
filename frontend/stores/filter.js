var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _genres = {};
var _subGenres = {};
var _locations = {};
var FilterStore = new Store(AppDispatcher);
var FilterConstants = require('../constants/filter_constants');

var resetGenres = function (genres) {
  genres.forEach(function (genre) {
    _genres[genre.id] = genre;
  })
  FilterStore.__emitChange();
};

var resetSubGenres = function (subGenres) {
  _subGenres = {};
  subGenres.forEach(function (subGenre) {
    _subGenres[subGenre.id] = subGenre;
  })
  FilterStore.__emitChange();
}

var resetLocations = function (locations) {
  locations.forEach(function (location) {
    _locations[location.id] = location;
  })
  FilterStore.__emitChange();
}

FilterStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case FilterConstants.GENRES_RECEIVED:
      resetGenres(payload.genres);
      break;
    case FilterConstants.SUBGENRES_RECEIVED:
      resetSubGenres(payload.subGenres);
      break;
    case FilterConstants.LOCATIONS_RECEIVED:
      resetLocations(payload.locations);
      break;
  }
};

FilterStore.allGenres = function () {
  var returnGenres = [];
  for (var id in _genres) {
    if (_genres.hasOwnProperty(id)) {
      returnGenres.push(_genres[id]);
    }
  };
  return returnGenres;
};

FilterStore.allSubGenres = function () {
  var returnSubGenres = [];
  for (var id in _subGenres) {
    if (_subGenres.hasOwnProperty(id)) {
      returnSubGenres.push(_subGenres[id]);
    }
  };
  return returnSubGenres;
};

FilterStore.allLocations = function () {
  var returnLocations = [];
  for (var id in _locations) {
    if (_locations.hasOwnProperty(id)) {
      returnLocations.push(_locations[id]);
    }
  };
  return returnLocations;
};

module.exports = FilterStore;
