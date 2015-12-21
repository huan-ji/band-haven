var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var History = require('react-router').History;
var AlbumStore = require('../../stores/album');

var AlbumDetail = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {
      album: AlbumStore.selectedAlbum
    }
  },

  handleSlideBack: function () {
    this.history.push("/")
  },

  render: function () {
    return (
        <div className="album-detail">
          <button onClick={this.handleSlideBack}>Slide Back</button>
          <h3>{album.title} Page</h3>
          <h4>By artist {album.artist.username}</h4>
        </div>
    )
  }
});

module.exports = AlbumDetail;
