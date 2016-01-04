var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var ApiActions = require('../../actions/api_actions');
var AlbumStore = require('../../stores/album');

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
    return (
      <div key={this.props.album.id} style={{position: "relative"}} onClick={this.handleClick}>
        <img className="album-index-img" src={this.props.album.cover_image}></img>
        <span className={this.state.buttonClass}>
          <img className={this.state.imgClass} src={this.state.buttonImg}></img>
        </span>
        <br/>
        <h4>{this.props.album.title}</h4>
        {this.props.album.artist.username}<br/>
      </div>
    );
  }
});

module.exports = AlbumIndexItem;
