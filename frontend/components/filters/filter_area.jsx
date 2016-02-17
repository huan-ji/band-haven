var React = require('react');
var AlbumFilter = require('./album_filter');
var ApiUtil = require('../../util/api_util');
var FilterStore = require('../../stores/filter');

var FilterArea = React.createClass({
  getInitialState: function () {
    this.genre = "all genres";
    this.subGenre = "all sub-genres";
    this.location = "all locations";
    return {
      genreStyle: "all genres"
    }
  },

  genreCallback: function (filter) {
    this.genre = filter;
    var filterObj = {
      genre: this.genre,
      sub_genre: this.subGenre,
      location: this.location
    };
    this.changeColor(filter);
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
      "all genres": "rgb(66, 160, 189)",
      "rock": "rgb(213, 31, 38)",
      "hip-hop/rap": "rgb(53, 100, 161)",
      "electronic": "rgb(49, 200, 35)",
      "pop": "rgb(243, 12, 147)",
      "r&b/soul": "rgb(77, 58, 120)"
    }
    var subGenreColors = {
      "all genres": "rgb(67, 144, 168)",
      "rock": "rgb(190, 34, 40)",
      "hip-hop/rap": "rgb(53, 91, 141)",
      "electronic": "rgb(49, 177, 37)",
      "pop": "rgb(217, 17, 134)",
      "r&b/soul": "rgb(69, 55, 103)"
    }
    var locationColors = {
      "all genres": "rgb(67, 144, 168)",
      "rock": "rgb(167, 36, 41)",
      "hip-hop/rap": "rgb(52, 82, 121)",
      "electronic": "rgb(48, 155, 38)",
      "pop": "rgb(193, 21, 121)",
      "r&b/soul": "rgb(62, 51, 86)"
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

    return (
      <div className="filter-area">
        <AlbumFilter
          apiFetch={ApiUtil.fetchAllGenres}
          storeAll={FilterStore.allGenres}
          callback={this.genreCallback}
          filterStyle={genreStyle}
          filterType="genres" />
        <AlbumFilter
          storeAll={FilterStore.allSubGenres}
          callback={this.subGenreCallback}
          filterStyle={subGenreStyle}
          filterType="sub-genres" />
        <AlbumFilter
          apiFetch={ApiUtil.fetchAllLocations}
          storeAll={FilterStore.allLocations}
          callback={this.locationCallback}
          filterStyle={locationStyle}
          filterType="locations" />
      </div>
    );
  }
});

module.exports = FilterArea;
