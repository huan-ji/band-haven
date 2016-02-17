var React = require('react');
var Fuse = require('fuse.js');
var AlbumStore = require('../../stores/album');
var ApiActions = require('../../actions/api_actions');
var ApiUtil = require('../../util/api_util');
var Link = require('react-router').Link;

var SearchBar = React.createClass({
  getInitialState: function () {
    return {
      searchText: "",
      searchResults: []
    };
  },

  componentDidMount: function () {
    this.albumListener = AlbumStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.albumListener.remove();
  },

  onChange: function () {
    if (AlbumStore.allSearch()) {
      var albums = AlbumStore.allSearch();
      var songs = []
      albums.forEach(function (album) {
        album.songs.forEach(function (song) {
          songs.push(song);
        })
      })

      var albumResult = this.albumElasticSearch(albums);
      var albumSongResults = this.songElasticSearch(songs, albumResult);
      this.setState({ searchResults: albumSongResults });
    }
  },

  albumElasticSearch: function (albums) {
    var options = {
      keys: ['title', 'artist'],
      threshold: 0.3
    };
    var fuse = new Fuse(albums, options);
    var albumResult = fuse.search(this.state.searchText);
    return albumResult;
  },

  songElasticSearch: function (songs, albumResult) {
    var options = {
      keys: ['title'],
      threshold: 0.3
    };
    var fuse = new Fuse(songs, options);
    var songResult = fuse.search(this.state.searchText);
    var albumSongResults = this.combineAlbumSongResults(songResult, albumResult);
    return albumSongResults;
  },

  combineAlbumSongResults: function (songResult, albumResult) {
    songResult.forEach(function (song) {
      var unique = true
      for (var i = 0; i < albumResult.length; i++) {
        if (albumResult[i].id === song.album.id) {
          unique = false
        }
      }

      if (unique) {
        albumResult.push(song.album);
      }
    })
    return albumResult;
  },

  searchChange: function (e) {
    var searchText = e.target.value;
    this.setState({ searchText: searchText });
    ApiUtil.fetchAllAlbums();
  },

  eraseResult: function () {
    this.setState({ searchText: "" })
  },

  render: function () {
    var searchResults = "";
    if (this.state.searchResults.length > 0) {
      searchResults = this.state.searchResults.map(function (result) {
        var resultLink = "/albums/" + result.id
        return (
          <Link key={result.id} to={resultLink}><div>{result.title}</div></Link>
        )
      })
    }

    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control"
            style={{ width: "200px" }}
            value={this.state.searchText}
            onChange={this.searchChange}
            placeholder="Search for Albums"/>
        </div>
        <ul onClick={this.eraseResult} className="search-result">
          {searchResults}
        </ul>
      </form>
    )
  }
})

module.exports = SearchBar
