var React = require('react');
var History = require('react-router').History;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var FrontPage = require('./components/front_page');
var ApiUtil = require('./util/api_util');
var Scroll = require('react-scroll');
var ScrollLink = Scroll.Link;
var Element = Scroll.Element;
var OnScroll = require("react-window-mixins").OnScroll;
var Player = require('./components/albums/music_player');
var ApiActions = require('./actions/api_actions');
var AlbumStore = require('./stores/album');
var DiscoverStore = require('./stores/discover');
var SearchBar = require('./components/navbar/search_bar');
var AuthCore = require('./components/auth/auth_core');

var NavBar = React.createClass({
  mixins: [History, OnScroll],

  getInitialState: function () {
    return {
      album: null,
      song: null,
      setup: false,
      navId: "navbar",
      user: null,
    };
  },

  onScroll: function () {
    if (document.getElementById("discover")) {
      var discoverHeight = document.getElementById("discover").offsetTop;
      if (discoverHeight > 0 && (window.pageYOffset >= discoverHeight - 200)) {
        this.setState({ navId: "navbar-closed" });
      } else if (window.pageYOffset < discoverHeight - 200) {
        this.setState({ navId: "navbar" })
      }
    } else {
      this.setState({ navId: "navbar" });
    }
  },

  discoverPath: function () {
    if (location.hash.split("/")[2]) {
      return <a style={{cursor: "pointer"}}
                onClick={this.navigateDiscoverAction}>Discover</a>
    } else {
      return <ScrollLink style={{cursor: "pointer"}} to="discover"
                         spy={true} smooth={true} offset={0}
                         duration={500}>
                         Discover</ScrollLink>
    }
  },

  navigateDiscoverAction: function (e) {
    e.preventDefault();
    ApiActions.setNavigateDiscover(true);
  },

  handleDiscover: function () {
    if (DiscoverStore.navigateDiscover()) {
      this.history.push("/discover");
    }
  },

  goHome: function () {
    var navbarImg = <img className="logo-img"
                         alt="BandHaven" src="assets/logo.png"></img>
    if (location.hash.split("/")[2]) {
      return <Link className="navbar-brand" to="/"
                   style={{cursor: "pointer"}}>{navbarImg}</Link>
    } else {
      return <ScrollLink className="navbar-brand" style={{cursor: "pointer"}}
                         to="top" spy={true} smooth={true} offset={0}
                         duration={500}>{navbarImg}</ScrollLink>
    }
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

  componentDidMount: function () {
    this.albumListener = AlbumStore.addListener(this.onChange);
    this.discoverListener = DiscoverStore.addListener(this.handleDiscover);
  },

  componentWillUnmount: function () {
    this.albumListener.remove();
    this.discoverListener.remove();
  },

  onChange: function () {
    var selectedAlbum = AlbumStore.selectedAlbum();
    var selectedSong = AlbumStore.selectedSong();
    this.state.song = selectedSong;
    this.setState({ album: selectedAlbum, song: selectedSong });
  },

  buttonClass: function () {
    return (
      this.state.song && this.state.song.playing ? "pause" : "play"
    )
  },

  play: function () {
    var playing = !this.state.song.playing;
    if (this.state.song.song !== "") ApiActions.playSwitch(playing);
  },

  render: function () {
    var songUrl = "";
    var songName = "";
    var albumInfo = "";
    if (this.state.song && this.state.song.song !== "") {
      songUrl = this.state.song.song.song_url;
      songName = this.state.song.song.title;
      albumInfo = (
        <div className="albumInfo">
          <Link className="album-link" to={"/albums/" + this.state.album.id}>
            {this.state.album.title}
          </Link><br/>
          by {this.state.album.artist}
        </div>
      )
    }

    return (
      <nav id={this.state.navId}
           className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {this.goHome()}
          </div>

          <audio id="music" preload="true" src={songUrl}>
        	</audio>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav" style={{ marginRight: "40px" }}>
              <li style={{ fontSize: "14pt"}}>{this.discoverPath()}</li>
            </ul>

            <SearchBar/>

            <div id="audioplayer" className="navbar-center">
            	<button id="pButton" className={this.buttonClass()} onClick={this.play}>
            	</button>
              <div id="timeline">
                <div className="nav-bar-songname">{songName}</div>
          		  <div id="playhead"></div>
              </div>
              {albumInfo}
            </div>

            <AuthCore/>

          </div>
        </div>
      </nav>
    )
  }
});

module.exports = NavBar;
