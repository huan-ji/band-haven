var React = require('react');
var AlbumStore = require('../../stores/album');
var Link = require('react-router').Link;
var Player = require('./music_player');
var ApiActions = require('../../actions/api_actions');

var CurrentAlbum = React.createClass({
  getInitialState: function () {
    return {
      album: null,
      song: null,
      setup: false
    }
  },

  componentDidMount: function () {
    this.listener = AlbumStore.addListener(this.onChange);

  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onChange: function () {
    var selectedAlbum = AlbumStore.selectedAlbum();
    var selectedSong = AlbumStore.selectedSong();
    this.state.song = selectedSong;
    this.setState({ album: selectedAlbum, song: selectedSong });
  },

  componentDidUpdate: function () {
    if (!this.state.setup && document.getElementById("music")) {
      Player.setup();
      this.state.setup = true;
      Player.play();
    } else if (this.state.setup) {
      Player.play();
    }
  },

  play: function () {
    var playing = !this.state.song.playing;
    ApiActions.playSwitch(playing);
  },

  buttonClass: function () {
    return (
      this.state.song.playing ? "pause" : "play"
    )
  },

  render: function () {
    var currentAlbum = ""

    if (this.state.album !== null) {
      var albumLink = "/albums/" + this.state.album.id
      currentAlbum = (
        <div>
          <script src="./music_player.js"></script>
          <img className="current-album-img" src={this.state.album.cover_image}/><br/>
          from the album <Link to={albumLink}>{this.state.album.title}</Link><br/>
          by artist {this.state.album.artist.username}<br/>
          <audio id="music" preload="true" src={this.state.song.song.song_url}>
        	</audio>
          <div id="audioplayer">
          	<button id="pButton" className={this.buttonClass()} onClick={this.play}></button>
            <div id="timeline">
        		  <div id="playhead"></div>
            </div>
          </div>
          <div id="audioplayer2">
          	<button id="pButton2" className={this.buttonClass()} onClick={this.play}></button>
            <div id="timeline2">
        		  <div id="playhead2"></div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="current-album">
        {currentAlbum}
      </div>
    )
  }
});

module.exports = CurrentAlbum;
