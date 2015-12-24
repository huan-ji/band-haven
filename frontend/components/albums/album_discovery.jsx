var React = require('react');
var AlbumIndex = require('./album_index');
var CurrentAlbum = require('./current_album');

var AlbumDiscovery = React.createClass({
  render: function () {
    return (
      <div>
        <AlbumIndex/>
      </div>
    )
  }
});

module.exports = AlbumDiscovery;
