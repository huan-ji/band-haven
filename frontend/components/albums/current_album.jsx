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

  componentDidUpdate: function () {
    if (!this.state.setup && document.getElementById("pButton2")) {
      Player.setup();
      this.state.setup = true;
    }
  },

  onChange: function () {
    if (this.state.album === null) {
      // debugger;
      this.setState({ album: AlbumStore.all()[0], song: AlbumStore.all()[0].songs[0] })
    } else if (AlbumStore.selectedAlbum() !== null){
      var selectedAlbum = AlbumStore.selectedAlbum();
      var selectedSong = AlbumStore.selectedSong();
      this.state.song = selectedSong;
      this.setState({ album: selectedAlbum, song: selectedSong });
    }
  },



  play: function () {
    // debugger;
    if (AlbumStore.selectedSong().song === "") {
      ApiActions.selectAlbum(this.state.album)
    } else {
      var playing = !this.state.song.playing;
      ApiActions.playSwitch(playing);
    }
  },

  buttonClass: function () {
    if (this.state.song) {
      return (
        this.state.song.playing ? "pause" : "play"
      )
    } else {
      return "play"
    }
  },

  render: function () {
    var currentAlbum = ""

    if (this.state.album !== null) {
      var albumLink = "/albums/" + this.state.album.id
      currentAlbum = (
        <div>

          <img className="current-album-img" src={this.state.album.cover_image}/><br/>
          from the album <Link to={albumLink}>{this.state.album.title}</Link><br/>
          by artist {this.state.album.artist.username}<br/>


        </div>
      )
    }

    return (
      <div className="current-album">

        {currentAlbum}

        <script src="./music_player.js"></script>
        <div id="audioplayer2">
          <button id="pButton2" className={this.buttonClass()} onClick={this.play}></button>
          <div id="timeline2">
            <div id="playhead2"></div>
          </div>
        </div>

      </div>
    )
  }
});

module.exports = CurrentAlbum;
