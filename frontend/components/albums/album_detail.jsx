var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var History = require('react-router').History;
var AlbumStore = require('../../stores/album');
var SongIndex = require('../songs/song_index');
var ApiActions = require('../../actions/api_actions');
var ApiUtil = require('../../util/api_util');

var AlbumDetail = React.createClass({
  mixins: [History],
  getInitialState: function () {
    // debugger;
    return {
      top: this.props.style.top,
      album: null
    }
  },

  componentDidMount: function () {
    var that = this;
    setTimeout(function () {
      that.setState({ top: "60" });
      window.scrollTo(0, 0);
    }, 600);
    this.listener = AlbumStore.addListener(this.onChange);
    ApiUtil.showSingleAlbum(parseInt(this.props.params.albumId));
    var bannerArray = [
      "http://res.cloudinary.com/dzqfe9334/image/upload/v1451763346/0006354568_0_bn0rwh.jpg",
      "http://res.cloudinary.com/dzqfe9334/image/upload/v1452731786/0006360714_0_asak4i.jpg",
      "http://res.cloudinary.com/dzqfe9334/image/upload/v1451763359/0006482592_0_cac0xb.jpg",
      "http://res.cloudinary.com/dzqfe9334/image/upload/v1450813093/0006428130_0_h0wikv.jpg"
     ]
    this.bannerUrl = bannerArray[Math.floor(Math.random()*bannerArray.length)];
  },

  onChange: function () {
    this.setState({ album: AlbumStore.showAlbum() });
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    var albumDetail = "";

    if (this.state.album) {
      albumDetail = (
        <div style={{ top: this.state.top }} className="album-detail">

          <div className="album-detail-info container">
            <div className="album-detail-banner"
              style={{ backgroundImage: "url(" + this.bannerUrl + ")" }}
              />
            <div className="album-detail-detail">
              <div className="col-xs-6">
                <h3>{this.state.album.title}</h3>
                <div>By {this.state.album.artist}</div>
                <SongIndex album={this.state.album}/>
              </div>

              <div className="col-xs-6">
                <img src={this.state.album.cover_image} className="album-detail-img"/>
              </div>
            </div>
          </div>
        </div>
      )
    }
    // debugger;
    return (
      <div>
        {albumDetail}
      </div>
    )
  }
});

module.exports = AlbumDetail;
