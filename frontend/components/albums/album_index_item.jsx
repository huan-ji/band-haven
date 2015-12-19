var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var ApiActions = require('../../actions/api_actions');

var AlbumIndexItem = React.createClass({
  handleClick: function () {
    ApiActions.selectAlbum(this.props.album)
  },

  render: function () {
    return (
      <div onClick={this.handleClick}>
        <img className="album-index-img" src={this.props.album.cover_image}/><br/>
        <h4>{this.props.album.title}</h4>
        {this.props.album.artist.username}<br/>
      </div>
    );
  }
});

module.exports = AlbumIndexItem;
