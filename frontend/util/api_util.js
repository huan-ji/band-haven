var ApiAction = require('../actions/api_actions.js');

var ApiUtil = {
  fetchAllAlbums: function () {
    $.get("api/albums", {}, function(albums) {
      ApiAction.receiveAlbums(albums);
    });
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
