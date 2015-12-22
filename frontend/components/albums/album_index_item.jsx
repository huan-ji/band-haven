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
    var that = this;
    setTimeout(function () {
      // debugger;
      that.setState({ album: that.props.album });
    }, 1)
    this.listener = AlbumStore.addListener(this.onChange);
  },

  onChange: function () {
    if (AlbumStore.selectedSong().playing && this.state.album === AlbumStore.selectedAlbum()) {
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
    var album = ""
    if (this.state.album !== "") {
      album = (
        <div key={this.state.album} style={{position: "relative"}} onClick={this.handleClick}>

          <img className="album-index-img" src={this.props.album.cover_image}>
            <span className={this.state.buttonClass}>
              <img className={this.state.imgClass} src={this.state.buttonImg}></img>
            </span>
          </img>
          <br/>
          <h4>{this.props.album.title}</h4>
          {this.props.album.artist.username}<br/>
        </div>
      )
    }

    return (
      <ReactCSS transitionName="album-transition"
        transitionEnterTimeout={600} transitionLeaveTimeout={600}>
        {album}
      </ReactCSS>
    );
  }
});

module.exports = AlbumIndexItem;
