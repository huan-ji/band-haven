var React = require('react');

var AlbumIndexItemDisplay = React.createClass({
  render: function () {
    return (
      <div onClick={this.handleClick}>
        <img className="album-index-img" src={this.props.album.cover_image}/><br/>
        <h4>{this.props.album.title}</h4>
        {this.props.album.artist.username}<br/>
      </div>
    )
  }
})

module.exports = AlbumIndexItemDisplay;
