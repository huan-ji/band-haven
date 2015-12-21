var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var ApiActions = require('../../actions/api_actions');

var AlbumIndexItem = React.createClass({
  getInitialState: function () {
    return {
      album: ""
    }
  },

  componentDidMount: function () {
    var that = this;
    setTimeout(function () {
      // debugger;
      that.setState({ album: that.props.album });
    }, 1)
  },

  handleClick: function () {
    ApiActions.selectAlbum(this.props.album)
  },

  render: function () {
    var album = ""
    if (this.state.album !== "") {
      album = (
        <div key={this.state.album} onClick={this.handleClick}>
          <img className="album-index-img" src={this.props.album.cover_image}/><br/>
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
