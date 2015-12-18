var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');

var AlbumIndexItem = React.createClass({
  render: function () {
    return (
      <div>
        <img src={this.props.album.cover_image}/><br/>
        <h4>{this.props.album.title}</h4>
        {this.props.album.artist.username}<br/>
      </div>
    );
  }
});

module.exports = AlbumIndexItem;
