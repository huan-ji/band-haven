var React = require('react');
var AlbumStore = require('../../stores/album');
var Link = require('react-router').Link;
var Player = require('./music_player');

var CurrentAlbum = React.createClass({
  getInitialState: function () {
    return {
      album: null
    }
  },

  componentDidMount: function () {
    this.listener = AlbumStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onChange: function () {
    this.setState({ album: AlbumStore.selectedAlbum() })
  },

  play: function () {
    Player.setup();
    Player.play();
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
          <audio id="music" preload="true">
            <source src="http://www.alexkatz.me/codepen/music/interlude.mp3"/>
        	</audio>
          <div id="audioplayer">
          	<button id="pButton" className="play" onClick={this.play}></button>
            <div id="timeline">
        		  <div id="playhead"></div>
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
