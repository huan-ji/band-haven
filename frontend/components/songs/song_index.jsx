var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var AlbumStore = require('../../stores/album');
var SongIndexItem = require('./song_index_item');

var SongIndex = React.createClass({
  render: function () {
    var songs = this.props.album.songs.map(function (song, i) {
      return <SongIndexItem key={i} song={song}/>
    })
    return (
      <ol>
        {songs}
      </ol>
    );
  }
})

module.exports = SongIndex;
