var React = require('react');
var GenreFilter = require('./genre_filter');
var SubGenreFilter = require('./sub_genre_filter');
var LocationFilter = require('./location_filter');
var ApiUtil = require('../../util/api_util');
var FilterStore = require('../../stores/filter');

var FilterArea = React.createClass({
  getInitialState: function () {
    this.genre = "all";
    this.subGenre = "all";
    this.location = "all";
    return {
      genreStyle: "all"
    }
  },

  genreCallback: function (filter) {
    this.genre = filter;
    // debugger;
    var filterObj = {
      genre: this.genre,
      sub_genre: this.subGenre,
      location: this.location
    };
    this.changeColor(filter);
    // debugger;
    ApiUtil.fetchFilteredSubGenres(filter)
    ApiUtil.fetchFilteredAlbums(filterObj);
  },

  changeColor: function (filter) {
    this.setState({ genreStyle: filter })
  },

  subGenreCallback: function (filter) {
    this.subGenre = filter;
    var filterObj = {
      genre: this.genre,
      sub_genre: this.subGenre,
      location: this.location
    };

    ApiUtil.fetchFilteredAlbums(filterObj);
  },

  locationCallback: function (filter) {
    this.location = filter;
    var filterObj = {
      genre: this.genre,
      sub_genre: this.subGenre,
      location: this.location
    };
    ApiUtil.fetchFilteredAlbums(filterObj);
  },

  render: function () {
    var genreColors = {
      "all": "rgb(66, 160, 189)",
      "rock": "rgb(213, 31, 38)",
      "hip-hop/rap": "rgb(53, 100, 161)",
      "eletronic": "rgb(49, 200, 35)",
      "pop": "rgb(243, 12, 147)",
      "r&amp;b/soul": "rgb(77, 58, 120)"
    }
    var subGenreColors = {
      "all": "rgb(67, 144, 168)",
      "rock": "rgb(190, 34, 40)",
      "hip-hop/rap": "rgb(53, 91, 141)",
      "eletronic": "rgb(49, 177, 37)",
      "pop": "rgb(217, 17, 134)",
      "r&amp;b/soul": "rgb(69, 55, 103)"
    }
    var locationColors = {
      "all": "rgb(67, 144, 168)",
      "rock": "rgb(167, 36, 41)",
      "hip-hop/rap": "rgb(52, 82, 121)",
      "eletronic": "rgb(48, 155, 38)",
      "pop": "rgb(193, 21, 121)",
      "r&amp;b/soul": "rgb(62, 51, 86)"
    }
    var genreStyle = {
      backgroundColor: genreColors[this.state.genreStyle],
      transition: "all 0.2s, text-indent 0.1ms",
    };

    var subGenreStyle = {
      backgroundColor: subGenreColors[this.state.genreStyle],
      transition: "all 0.2s, text-indent 0.1ms",
    };

    var locationStyle = {
      backgroundColor: locationColors[this.state.genreStyle],
      transition: "all 0.2s, text-indent 0.1ms",
    };
    // debugger;

    return (
      <div className="filter-area">
        <GenreFilter
          apiFetch={ApiUtil.fetchAllGenres}
          storeAll={FilterStore.allGenres}
          callback={this.genreCallback}
          testStyle={genreStyle}
          filterType="genre" />
        <GenreFilter
          storeAll={FilterStore.allSubGenres}
          callback={this.subGenreCallback}
          testStyle={subGenreStyle}
          filterType="subGenre" />
        <GenreFilter
          apiFetch={ApiUtil.fetchAllLocations}
          storeAll={FilterStore.allLocations}
          callback={this.locationCallback}
          testStyle={locationStyle}
          filterType="location" />
      </div>
    );
  }
});

module.exports = FilterArea;
