var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var ApiActions = require('../../actions/api_actions');
var AlbumStore = require('../../stores/album');
var Link = require('react-router').Link;

var AlbumIndexItem = React.createClass({
  getInitialState: function () {
    return {
      album: "",
      buttonImg: "assets/play.png",
      imgClass: "play-img",
      buttonClass: "play-button"
    }
  },

  componentDidMount: function () {
    this.listener = AlbumStore.addListener(this.onChange);
    this.onChange();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onChange: function () {
    if (AlbumStore.selectedSong().playing && this.props.album.id === AlbumStore.selectedAlbum().id) {
      this.setState({
        buttonImg: "assets/pause.png",
        imgClass: "pause-img",
        buttonClass: "pause-button",
      })
    } else {
      this.setState({
        buttonClass: "play-button",
        imgClass: "play-img",
        buttonImg: "assets/play.png"
      })
    }
  },

  handleClick: function () {
    ApiActions.selectAlbum(this.props.album)
  },

  render: function () {
    var albumLink = "/albums/" + this.props.album.id;
    return (
      <div className="album-index-item">
        <div onClick={this.handleClick}>
          <img className="album-index-img" src={this.props.album.cover_image}></img>
          <span className={this.state.buttonClass}>
            <img className={this.state.imgClass} src={this.state.buttonImg}></img>
          </span>
          <br/>
        </div>
        <div style={{ marginLeft: "5px" }}>
          <Link to={albumLink} className="album-link">{this.props.album.title}</Link><br/>
          {this.props.album.artist.username}<br/>
        </div>
      </div>
    );
  }
});

module.exports = AlbumIndexItem;
