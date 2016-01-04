var ApiAction = require('../actions/api_actions.js');

var ApiUtil = {
  fetchAllAlbums: function () {
    $.get("api/albums", {}, function(albums) {
      ApiAction.receiveAlbums(albums);
    });
  },

  fetchSingleAlbum: function (albumId) {
    $.get("api/albums/" + albumId, {}, function (album) {
      ApiAction.receiveAlbum(album);
    });
  },

  fetchFilteredAlbums: function (filters) {
    $.get("api/albums", { filters: filters }, function(albums) {
      // debugger;
      ApiAction.receiveAlbums(albums);
    });
  },

  fetchAllGenres: function () {
    $.get("api/genres", {}, function(genres) {
      ApiAction.receiveGenres(genres);
    });
  },

  fetchAllSubGenres: function () {
    $.get("api/sub_genres", {}, function(subGenres) {
      ApiAction.receiveSubGenres(subGenres);
    });
  },

  fetchFilteredSubGenres: function (filters) {
    $.get("api/sub_genres", { filters: filters }, function(subGenres) {
      ApiAction.receiveSubGenres(subGenres);
    });
  },

  fetchAllLocations: function () {
    $.get("api/locations", {}, function(locations) {
      ApiAction.receiveLocations(locations);
    });
  },

  checkAuth: function () {
    $.get("users", {}, function (user) {
      ApiAction.receiveUser(user);
    })
  },

  createUser: function (user) {
    $.post("users", { user: user }, function (results) {
      ApiAction.receiveAuthMessages(results);
    });
  },

  signInUser: function (user) {
    $.post("sessions", { user: user }, function (results) {
      ApiAction.receiveAuthMessages(results);
    });
  },

  signOutUser: function () {
    $.ajax({
      url: "sessions",
      type: "DELETE",
      success: function (results) {

      }
    });
  },

};

module.exports = ApiUtil;
