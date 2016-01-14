var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var AlbumStore = require('../../stores/album');
var ApiActions = require('../../actions/api_actions');

var SongIndexItem = React.createClass({
  getInitialState: function () {
    return {
      selectedSong: AlbumStore.selectedSong(),
    }
  },

  componentDidMount: function () {
    this.listener = AlbumStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onChange: function () {
    this.setState({ selectedSong: AlbumStore.selectedSong() });
  },

  playSwitch: function () {
    ApiActions.selectSong(this.props.song);
  },

  render: function () {
    // debugger;
    var songClass = (this.state.selectedSong.song.id === this.props.song.id ? "selected" : "unselected");
    var imgUrl = (this.state.selectedSong.playing && this.state.selectedSong.song.id === this.props.song.id ? "assets/pause2.png" : "assets/play2.png");
    var imgClass = (this.state.selectedSong.playing && this.state.selectedSong.song.id === this.props.song.id ? "black-pause-img" : "black-play-img");

    return (
      <li className="song-index-item">
        <span className="black-button" onClick={this.playSwitch}>
          <img className={imgClass} src={imgUrl}/>
        </span>&nbsp; &nbsp;
        <div className="song-li">
          <span className={songClass}>
            {this.props.song.title} &nbsp; &nbsp;
            {this.props.song.duration}
          </span>
        </div>
      </li>
    );
  }
})

module.exports = SongIndexItem;
