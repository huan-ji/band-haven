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
    // debugger;
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
      // if (this.state.albums.length <= 8) {
      //   albums = this.state.albums.map(function (album, key) {
      //     return (
      //         <AlbumIndexItem key={album.id} album={album}/>
      //     )
      //   })
      // } else {
      //   albums = this.state.albums.slice(0, 8).map(function (album, key) {
      //     return (
      //         <AlbumIndexItem key={album.id} album={album}/>
      //     )
      //   })
      // }
      albums = this.state.albums.map(function (album, key) {
        return (
            <AlbumIndexItem key={album.id} album={album}/>
        )
      })
    }
    return (
      <ReactCSS transitionName="album-transition" className="front-page-albums"
        transitionEnterTimeout={600} transitionLeaveTimeout={100}>
        {albums}
      </ReactCSS>
    );
  }
});

module.exports = AlbumIndex;
