var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var History = require('react-router').History;
var AlbumStore = require('../../stores/album');
var SongIndex = require('../songs/song_index');
var ApiActions = require('../../actions/api_actions');

var AlbumDetail = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {
      album: AlbumStore.selectedAlbum()
    }
  },

  // componentDidMount: function () {
  //   ApiActions.selectSong(this.state.album.songs[0]);
  // },

  handleSlideBack: function () {
    this.history.push("/")
  },

  render: function () {
    var album = this.state.album;
    return (
      <div className="album-detail">
        <h3>{album.title} Page</h3>
        <h4>By artist {album.artist.username}</h4>
        <SongIndex album={this.state.album}/>
      </div>
    )
  }
});

module.exports = AlbumDetail;
