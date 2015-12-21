var React = require('react');
var AlbumIndexItem = require('./album_index_item');
var AlbumStore = require('../../stores/album');
var ApiUtil = require('../../util/api_util');
var ReactCSS = require('react-addons-css-transition-group');
var ApiActions = require('../../actions/api_actions');

var AlbumIndex = React.createClass({
  getInitialState: function () {
    return {
      albums: []
    }
  },

  componentDidMount: function () {
    // debugger;
    this.albumListener = AlbumStore.addListener(this.onChange);
    var filterObj = {
      genre: "all",
      sub_genre: "all",
      location: "all"
    };
    ApiUtil.fetchFilteredAlbums(filterObj);
  },

  componentWillUnmount: function () {
    this.albumListener.remove();
  },

  onChange: function () {
    // debugger;
    this.setState({ albums: AlbumStore.all() });

  },

  render: function () {
    var albums;
    if (this.state.albums.length > 0) {
      albums = this.state.albums.map(function (album, key) {
        return (
            <AlbumIndexItem key={key} album={album}/>
        )
      })
    }
    return (
        <ul className="front-page-albums">{albums}</ul>
    );
  }
});

module.exports = AlbumIndex;
