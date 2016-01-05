var React = require('react');
var History = require('react-router').History;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var FrontPage = require('./components/front_page');
var Auth = require('./components/auth/auth_comp');
var ApiUtil = require('./util/api_util');
var Scroll = require('react-scroll');
var ScrollLink = Scroll.Link;
var Element = Scroll.Element;
var OnScroll = require("react-window-mixins").OnScroll;
var Player = require('./components/albums/music_player');
var ApiActions = require('./actions/api_actions');
var AlbumStore = require('./stores/album');
var AuthStore = require('./stores/auth');
var Fuse = require('fuse.js');

var NavBar = React.createClass({
  mixins: [History, OnScroll],

  getInitialState: function () {
    return {
      album: null,
      song: null,
      setup: false,
      auth: false,
      method: "",
      loggedIn: false,
      navId: "navbar",
      user: null,
      searchText: "",
      searchResults: []
    };
  },

  onScroll: function () {
    if (document.getElementById("discover")) {
      var discoverHeight = document.getElementById("discover").offsetTop;
      if (document.getElementById("discover") && document.getElementById("discover").offsetTop > 0 && (window.pageYOffset >= document.getElementById("discover").offsetTop - 15) && !this.disappear) {
        this.disappear = true;
        this.setState({ navId: "navbar-closed" });
      } else if (document.getElementById("discover") && window.pageYOffset < document.getElementById("discover").offsetTop - 16 && this.disappear) {
        this.disappear = false;
        this.setState({ navId: "navbar" })
      }
    } else {
      this.disappear = false;
      this.setState({ navId: "navbar" });
    }
  },

  handleAuth: function (authMethod) {
    this.setState({ auth: true, method: authMethod })
  },

  checkAuth: function () {
    ApiUtil.checkAuth();
  },

  handleLogOut: function () {
    ApiUtil.signOutUser();
    this.setState({ loggedIn: false, user: null })
  },

  discoverPath: function () {
    if (location.hash.split("/")[2]) {
      // debugger;
      // this.history.
      return <Link to="/discover" style={{cursor: "pointer"}}>Discover</Link>
    } else {
      return <ScrollLink style={{cursor: "pointer"}} to="discover" spy={true} smooth={true} offset={50} duration={500}>Discover</ScrollLink>
    }
  },

  goHome: function () {
    var navbarImg = <img className="logo-img" alt="BandHaven" src="assets/logo.png"></img>
    if (location.hash.split("/")[2]) {
      return <Link className="navbar-brand" to="/" style={{cursor: "pointer"}}>{navbarImg}</Link>
    } else {
      return <ScrollLink className="navbar-brand" style={{cursor: "pointer"}} to="top" spy={true} smooth={true} offset={50} duration={500}>{navbarImg}</ScrollLink>
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

  authChange: function () {
    var user = AuthStore.user();
    if (user) {
      this.setState({ loggedIn: true, user: user })
    } else {
      this.setState({ loggedIn: false })
    }
  },


  componentDidMount: function () {
    this.listener = AlbumStore.addListener(this.onChange);
    this.authListener = AuthStore.addListener(this.authChange);
    this.checkAuth();
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.authListener.remove();
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

      var options = {
        keys: ['title', 'artist.username'],
      };
      var fuse = new Fuse(albums, options);
      var albumResult = fuse.search(this.state.searchText);

      var options2 = {
        keys: ['title']
      };

      var fuse2 = new Fuse(songs, options2);
      var songResult = fuse2.search(this.state.searchText);
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

      this.setState({ searchResults: albumResult });
    }
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
    ApiActions.playSwitch(playing);
  },

  searchChange: function (e) {
    var searchText = e.target.value;
    this.setState({ searchText: searchText });
    ApiUtil.fetchAllAlbums();
  },

  render: function () {
    var modal = "";
    if (this.state.auth) {
      modal = <Auth method={this.state.method} callback={this.checkAuth}/>
    };

    var authMenu;
    if (this.state.loggedIn) {
      authMenu = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a onClick={this.handleLogOut}>Log Out</a>
          </li>
        </ul>
      )
    } else {
      authMenu = (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">New User<span className="caret"></span></a>
            <div className="dropdown-menu" id="login-dropdown">
              <Auth method="Sign Up" callback={this.checkAuth}/>
            </div>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Log In<span className="caret"></span></a>
            <div className="dropdown-menu" id="login-dropdown">
              <Auth method="Sign In" callback={this.checkAuth}/>
            </div>
          </li>
        </ul>
      )
    }

    var songUrl = "";
    var songName = "";
    var albumInfo = "";
    if (this.state.song && this.state.song.song !== "") {
      // debugger;
      songUrl = this.state.song.song.song_url;
      songName = this.state.song.song.title;
      albumInfo = (
        <div className="albumInfo">
          <Link className="album-link" to={"/albums/" + this.state.album.id}>{this.state.album.title}</Link><br/>
          by {this.state.album.artist.username}
        </div>
      )
    }


    var searchResults = "";
    if (this.state.searchResults.length > 0) {
      searchResults = this.state.searchResults.map(function (result) {
        var resultLink = "/albums/" + result.id
        return (
          <Link to={resultLink}>{result.title}<br/></Link>
        )
      })
    }

    return (
      <nav id={this.state.navId} className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
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
            <ul className="nav navbar-nav">
              <li className="active">{this.discoverPath()}</li>
            </ul>
            <form className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input type="text" className="form-control"
                  style={{ width: "250px" }}
                  value={this.state.searchText}
                  onChange={this.searchChange}
                  placeholder="Search by Album, Track, or Artist"/>
              </div>
              <ul className="search-result">
                {searchResults}
              </ul>
            </form>


            <div id="audioplayer">
            	<button id="pButton" className={this.buttonClass()} onClick={this.play}></button>
              <div id="timeline">
                <div className="nav-bar-songname">{songName}</div>
          		  <div id="playhead"></div>

              </div>
              {albumInfo}
            </div>
            {authMenu}

          </div>
        </div>
      </nav>
    )
  }
});

module.exports = NavBar;
